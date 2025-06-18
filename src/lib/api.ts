// lib/api.ts
import axios from "axios";

const API_URL = `https://${
  import.meta.env.VITE_ENDPOINT
}.mockapi.io/api/v1/tasks`;

export const getTasks = () => axios.get(API_URL);

export const createTask = (task) => axios.post(API_URL, task);

export const updateTask = (id, updatedData) =>
  axios.put(`${API_URL}/${id}`, updatedData);

export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
