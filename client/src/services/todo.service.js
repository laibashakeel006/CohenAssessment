import api from "./api";
import { todoEndpoints } from "./endpoints/todo.endpoints";

export const todoService = {
  async list() {
    const { data } = await api.get(todoEndpoints.list);
    return data;
  },

  async create(payload) {
    const { data } = await api.post(todoEndpoints.create, payload);
    return data;
  },

  async remove(id) {
    const { data } = await api.delete(todoEndpoints.delete, {
      data: { id: String(id) },
    });
    return data;
  },
  async getTodo(payload) {
    const { data } = await api.post(todoEndpoints.getTodo, payload);
    return data;
  },

};
