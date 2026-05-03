const redis = require('redis');
const client = redis.createClient();

client.connect();

module.exports = {
  async create(todo) {
    await client.set(`todo:${todo.id}`, JSON.stringify(todo));
    return todo;
  },

  async findAll() {
    const keys = await client.keys('todo:*');
    const values = await Promise.all(keys.map(k => client.get(k)));
    return values.map(v => JSON.parse(v));
  },

  async findById(id) {
    const data = await client.get(`todo:${id}`);
    return JSON.parse(data);
  },

  async update(id, newData) {
    let todo = await this.findById(id);
    let updated = { ...todo, ...newData };
    await client.set(`todo:${id}`, JSON.stringify(updated));
    return updated;
  },

  async delete(id) {
    await client.del(`todo:${id}`);
  }
};
