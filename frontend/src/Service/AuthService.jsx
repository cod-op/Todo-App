import axios from "axios";

const registerUser = (data) => {
  return axios.post("https://todo-app-backend-vse5.onrender.com/api/v1/user/register", data);
};

const loginUSer = (data) => {
  return axios.post("https://todo-app-backend-vse5.onrender.com/api/v1/user/login", data);
};

const AuthServices = { registerUser, loginUSer };

export default AuthServices;
