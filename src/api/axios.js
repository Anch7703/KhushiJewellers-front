import axios from "axios";

const instance = axios.create({
  baseURL: "https://khushijewllers.onrender.com/api",
  withCredentials: true, // ✅ ensures session cookies are sent
});

export default instance;
