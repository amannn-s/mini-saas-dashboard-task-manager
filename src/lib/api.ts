import axios from "axios";

const API_URL = `https://${
  import.meta.env.VITE_ENDPOINT
}.mockapi.io/api/v1/tasks`;

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in progress" | "done";
};

// Partial<Task> for create and update (since not all fields are required when updating)
export const getTasks = () => axios.get<Task[]>(API_URL);

export const createTask = (task: Omit<Task, "id">) =>
  axios.post<Task>(API_URL, task);

export const updateTask = (
  id: string,
  updatedData: Partial<Omit<Task, "id">>
) => axios.put<Task>(`${API_URL}/${id}`, updatedData);

export const deleteTask = (id: string) =>
  axios.delete<void>(`${API_URL}/${id}`);
