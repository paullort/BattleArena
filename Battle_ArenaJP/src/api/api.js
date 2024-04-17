import axios from 'axios';

const api = axios.create({
  baseURL: 'https://balandrau.salle.url.edu/i3/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;