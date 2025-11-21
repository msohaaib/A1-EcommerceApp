import axios from "axios";

const API = axios.create({
  baseURL: "https://a1-ecommerceapp.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
