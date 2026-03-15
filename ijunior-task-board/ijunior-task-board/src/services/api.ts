import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://trainee.fidelis.workers.dev/api',
  headers: {
    'Authorization': 'Bearer 9908e850-1adc-4e92-b04e-ce5868d604d5',
    'Content-Type': 'application/json',
  },
});