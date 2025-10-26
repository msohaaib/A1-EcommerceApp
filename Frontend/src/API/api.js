import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.119:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
