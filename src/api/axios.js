import axios from "axios";

const instance = axios.create({
  baseURL: "https://khushijewllers.onrender.com/api",  // ✅ backend URL
  withCredentials: true
});


export default instance;
