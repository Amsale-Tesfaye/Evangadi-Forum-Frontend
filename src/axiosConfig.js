import axios from 'axios'

const axiosBase = axios.create({
  //local/frontend
  // baseURL: "http://localhost:5500/api"

  //deployed version of Envangadi Forum on render.com/backend
  baseURL: "https://evangadi-forum-backend-7-ssab.onrender.com/api",
});

export default axiosBase
