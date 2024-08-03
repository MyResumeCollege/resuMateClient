import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL + "/api",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

export default apiClient;