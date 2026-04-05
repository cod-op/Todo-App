import axios from "axios";

axios.defaults.baseURL = "https://todo-app-backend-8w30.onrender.com/api/v1";

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("todoapp"));
  return {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
};

const createTodo = (data) => {
  return axios.post("/todo/create", data, getAuthHeader());
};

const getAllTodo = (id) => {
  return axios.post(`/todo/getAll/${id}`, {}, getAuthHeader());
};

const updateTodo = (id, data) => {
  return axios.patch(`/todo/update/${id}`, data, getAuthHeader());
};

const deleteTodo = (id) => {
  return axios.delete(`/todo/delete/${id}`, getAuthHeader());
};

export default { createTodo, getAllTodo, updateTodo, deleteTodo };
