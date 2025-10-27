import axios from "axios";

const API = axios.create({
  baseURL: "http://10.0.2.2:3000/api/v1", // 👈 change port to your backend port
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
