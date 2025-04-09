// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://185.113.249.229:5000/', // Replace with your backend URL
});

export default api;