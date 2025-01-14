import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react';

const API_KEY = '741d60afa26fe3f96424829593b87c57';
const BASE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=';

const GenresContext = createContext();

const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(`${BASE_URL}${API_KEY}`);
      setGenres(response.data.genres);
    };

    fetchGenres();
  }, []);

  return <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>;
};

export { GenresProvider, GenresContext };
