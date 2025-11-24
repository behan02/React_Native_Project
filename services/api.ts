import axios from 'axios';

const authInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: { 'Content-Type': 'application/json' },
});

const exercisesInstance = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': '4YcQOefbYgU2now5fy1UeA==wtiVmGoMAcWGkSz2',
  },
});

const api = {
  login: async (username: string, password: string) => {
    // DummyJSON supports /auth/login
    const res = await authInstance.post('/auth/login', { username, password });
    // response contains token and user-like fields
    return res.data;
  },
  fetchItems: async () => {
    // Fetch exercises from API Ninjas
    const res = await exercisesInstance.get('/exercises?muscle=biceps');
    return res.data;
  },
};

export default api;
