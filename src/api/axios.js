import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // ✅ ensures session cookies are sent
});

export default instance;
