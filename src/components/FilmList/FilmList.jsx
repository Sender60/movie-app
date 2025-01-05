import React, { useState, useEffect } from 'react';
import { Input, Spin, Alert } from 'antd';
import debounce from 'lodash.debounce';
import FilmListItem from '../FilmListItem/FilmListItem';
import './FilmList.css';
import api from '../api/api';

const FilmList = () => {
  const [movieList, setMovieList] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const fetchMovieList = async () => {
    if (value !== '') {
      setLoading(true);
      try {
        const response = await api(value);
        setMovieList(response.data.results);
        setShowAlert(response.data.results.length === 0);
      } catch (error) {
        setMovieList([]);
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    } else {
      setMovieList([]);
      setLoading(false);
      setShowAlert(false);
    }
  };

  const debouncedSearch = debounce(fetchMovieList, 500);

  useEffect(() => {
    debouncedSearch();
    return debouncedSearch.cancel;
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === '') {
      setShowAlert(false);
    }
  };

  return (
    <>
      <Input placeholder="Поиск" className="film-list__search" onChange={(e) => setValue(handleChange(e))} />
      {showAlert && <Alert message="Ничего не найдено" type="warning" style={{ width: '80%', margin: '20px auto' }} />}
      {movieList.length === 0 && value === '' && <p style={{ textAlign: 'center' }}>Введите название фильма</p>}
      {loading ? (
        <Spin className="loader" />
      ) : (
        <ul className="film-list">
          {movieList.map((movie) => (
            <FilmListItem key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </>
  );
};

export default FilmList;
