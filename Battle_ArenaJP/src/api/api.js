import axios from 'axios';

const api = axios.create({
  baseURL: 'https://balandrau.salle.url.edu/i3/', // Replace this with the actual API URL if it's different
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;