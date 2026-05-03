import api from "./api";
import { taskEndpoints } from "./endpoints/task.endpoints";

export const taskService = {
  async list(id) {
    const { data } = await api.post(taskEndpoints.list, id);
    return data;
  },

  async create(payload) {
    const { data } = await api.post(taskEndpoints.create, payload);
    return data;
  },

  async createTask(payload) {
    const { data } = await api.post(taskEndpoints.create, payload);
    return data;
  },

  async remove(id, taskId) {
    const { data } = await api.delete(taskEndpoints.delete, {
      data: { id: String(id), taskId: String(taskId) },
    });
    return data;
  },
};
