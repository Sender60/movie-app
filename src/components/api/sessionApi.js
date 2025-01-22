import axios from 'axios';
import { API_KEY, BASE_URL } from '../utils/util';

export const sessionApi = async () => {
  const response = await axios.get(`${BASE_URL}authentication/guest_session/new`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response;
};

const getRatedMovies = async (guestSessionId, page) => {
  const response = await axios.get(`${BASE_URL}guest_session/${guestSessionId}/rated/movies`, {
    params: {
      api_key: API_KEY,
      page,
    },
  });
  return response;
};

const setRatedMovies = async (movieTd, guestSessionId, myRating) => {
  const response = await axios.post(
    `${BASE_URL}movie/${movieTd}/rating`,
    {
      value: myRating,
    },
    {
      params: {
        api_key: API_KEY,
        guest_session_id: guestSessionId,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response;
};

export const getGuestSessionId = async () => {
  const storedGuestSessionId = localStorage.getItem('guestSessionId');
  if (storedGuestSessionId) {
    return storedGuestSessionId;
  }
  const response = await sessionApi();
  const guestSessionId = response.data.guest_session_id;
  localStorage.setItem('guestSessionId', guestSessionId);
  return guestSessionId;
};

export const setMyRatingMovie = async (movieTd, myRating) => {
  const guestSessionId = await getGuestSessionId();
  const response = await setRatedMovies(movieTd, guestSessionId, myRating);
  return response;
};

export const getRatedMoviesList = async (page) => {
  const guestSessionId = await getGuestSessionId();
  const response = await getRatedMovies(guestSessionId, page);
  return response;
};
