import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
  
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
//   config same-origin
//   credentials: 'same-origin',
});

export default instance;
