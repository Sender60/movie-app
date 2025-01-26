import React, { useState, useEffect, useContext } from 'react';
import { Input, Spin, Alert, Pagination } from 'antd';
import debounce from 'lodash.debounce';
import FilmListItem from '../FilmListItem/FilmListItem';
import './FilmList.css';
import api from '../api/api';
import { GenresContext } from '../api/genresApi';
import { getRatedMoviesList } from '../api/sessionApi';

const FilmList = ({ parameter }) => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [searchvalue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [ratedPage, setRatedPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error404, setError404] = useState(false);

  const genres = useContext(GenresContext);

  const fetchMovieList = async (page = 1) => {
    if (searchvalue !== '') {
      try {
        setLoading(true);
        const response = await api(searchvalue, page);
        const searchMoviewithRatings = response.data.results.map((movie) => {
          const movieWithRatings = ratedMovies.find((ratedMovie) => ratedMovie.id === movie.id);
          return movieWithRatings ? { ...movie, rating: movieWithRatings.rating } : movie;
        });
        setSearchMovies(searchMoviewithRatings);
        setTotalResults(response.data.total_results);
        setShowAlert(response.data.results.length === 0);
      } catch (error) {
        setSearchMovies([]);
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchMovies([]);
      setLoading(false);
      setShowAlert(false);
    }
  };

  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    if (parameter === 'Search') {
      fetchMovieList(page);
      setSearchPage(page);
    } else {
      setRatedPage(page);
      getRatedMoviesList(page).then((response) => {
        setRatedMovies(response.data.results);
      });
    }
  };

  const debouncedSearch = debounce(fetchMovieList, 500);

  useEffect(() => {
    setSearchPage(1);
    debouncedSearch();
    return debouncedSearch.cancel;
  }, [searchvalue]);

  useEffect(() => {
    if (parameter === 'Rated') {
      setLoading(true);
      getRatedMoviesList().then((movies) => {
        if (movies.error) {
          setError404(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setError404(false);
        setRatedMovies(movies.data.results);
        setTotalResults(movies.data.total_results);
      });
    }
    if (parameter === 'Search') {
      setError404(false);
      fetchMovieList();
    }
  }, [parameter]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      setShowAlert(false);
      setSearchMovies([]);
    }
  };

  return (
    <>
      {parameter === 'Search' && (
        <>
          <Input placeholder="Поиск" className="film-list__search" onChange={handleChange} value={searchvalue} />
          {showAlert && <Alert message="Ничего не найдено" type="warning" style={{ width: '80%', margin: '20px auto' }} />}
          {searchvalue === '' && <p style={{ textAlign: 'center' }}>Введите название фильма</p>}
        </>
      )}
      {loading ? (
        <Spin className="loader" />
      ) : (
        <>
          {error404 && <Alert type="info" message="Оценённых фильмов нет" style={{ width: '80%', margin: '20px auto' }} />}
          <ul className="film-list">
            {(parameter === 'Search' ? searchMovies : ratedMovies).map((movie) => (
              <FilmListItem key={movie.id} movie={movie} genres={genres} />
            ))}
          </ul>
        </>
      )}
      {(parameter === 'Search' && searchMovies.length > 0 && totalResults > 1 && loading === false) ||
      (parameter === 'Rated' && ratedMovies.length > 0 && loading === false) ? (
        <Pagination
          defaultCurrent={1}
          onChange={handlePageChange}
          current={parameter === 'Search' ? searchPage : ratedPage}
          defaultPageSize={20}
          total={totalResults}
          align="center"
          style={{ margin: '20px' }}
        />
      ) : null}
    </>
  );
};

export default FilmList;
