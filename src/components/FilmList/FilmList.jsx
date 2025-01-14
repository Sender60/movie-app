import React, { useState, useEffect, useContext } from 'react';
import { Input, Spin, Alert, Pagination } from 'antd';
import debounce from 'lodash.debounce';
import FilmListItem from '../FilmListItem/FilmListItem';
import './FilmList.css';
import api from '../api/api';
import { GenresContext } from '../api/genresApi';

const FilmList = () => {
  const [movieList, setMovieList] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const genres = useContext(GenresContext);

  const fetchMovieList = async (page = 1) => {
    if (value !== '') {
      setLoading(true);
      try {
        const response = await api(value, page);
        setMovieList(response.data.results);
        setTotalPages(response.data.total_pages);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchMovieList(page);
  };

  const debouncedSearch = debounce(fetchMovieList, 500);

  useEffect(() => {
    setCurrentPage(1);
    debouncedSearch();
    return debouncedSearch.cancel;
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === '') {
      setShowAlert(false);
      setMovieList([]);
    }
  };

  return (
    <>
      <Input placeholder="Поиск" className="film-list__search" onChange={handleChange} />
      {showAlert && <Alert message="Ничего не найдено" type="warning" style={{ width: '80%', margin: '20px auto' }} />}
      {value === '' && <p style={{ textAlign: 'center' }}>Введите название фильма</p>}
      {loading ? (
        <Spin className="loader" />
      ) : (
        <ul className="film-list">
          {movieList.map((movie) => (
            <FilmListItem key={movie.id} movie={movie} genres={genres} />
          ))}
        </ul>
      )}
      {movieList.length > 0 && totalPages > 1 && (
        <Pagination
          defaultCurrent={1}
          onChange={handlePageChange}
          current={currentPage}
          total={totalPages}
          align="center"
          style={{ margin: '20px' }}
        />
      )}
    </>
  );
};

export default FilmList;
