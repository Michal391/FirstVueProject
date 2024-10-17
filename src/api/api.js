// src/api.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://172.16.1.33:8005',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function fetchTrainees() {
  return apiClient.get('/trainee');
}




