import axios from 'axios';
import { API_KEY, BASE_URL } from '../utils/util';

const api = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}search/movie`, {
    params: {
      api_key: API_KEY,
      page,
      query,
    },
  });
  return response;
};

export default api;
