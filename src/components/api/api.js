import axios from 'axios';

const API_KEY = '741d60afa26fe3f96424829593b87c57';
const BASE_URL = 'https://api.themoviedb.org/3/';

const api = async (query) => {
  const response = await axios.get(`${BASE_URL}search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });
  return response;
};

export default api;
