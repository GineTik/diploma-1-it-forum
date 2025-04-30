import axios from 'axios';
import { toast } from 'sonner';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    toast.error(message);
    return Promise.reject(error);
  }
);
