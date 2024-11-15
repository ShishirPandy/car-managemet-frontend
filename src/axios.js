// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,  // Use the API URL from environment variables
});

export default instance;
