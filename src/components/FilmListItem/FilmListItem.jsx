/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Col, Row, Card, Image } from 'antd';
import './FilmListItem.css';
import { format } from 'date-fns';
import StarRating from '../StarRaring/StarRating';
import maxDescriptionLength from '../utils/util';
import { setMyRatingMovie } from '../api/sessionApi';

const FilmListItem = ({ movie, genres }) => {
  const {
    id,
    title,
    genre_ids: genreIds,
    overview,
    poster_path: posterPath,
    vote_average: averageRating,
    release_date: releaseDate,
    rating,
  } = movie;

  const genreNames = genreIds.map((genreId) => genres.find((genre) => genre.id === genreId).name);

  function getRatingColor(ratingMovie) {
    if (ratingMovie > 7) return '#66E900';
    if (ratingMovie > 5) return '#E9D100';
    if (ratingMovie > 3) return '#E97E00';
    return '#E90000';
  }

  function handleRate(value) {
    setMyRatingMovie(id, value);
  }

  return (
    <li key={id} className="list-item">
      <Card
        style={{
          width: 450,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
        styles={{ body: { padding: 0 } }}
      >
        <Row gutter={16} wrap={false}>
          <Col>
            <Image
              width={200}
              height={300}
              src={posterPath === null ? '/img/noposter.jpg' : `https://image.tmdb.org/t/p/w500/${posterPath}`}
              alt="poster"
            />
          </Col>
          <Col style={{ width: '100%' }}>
            <div className="list-item__info">
              <h3 className="list-item__title">{title}</h3>
              <span className="list-item__rating" style={{ borderColor: getRatingColor(averageRating) }}>
                {averageRating.toFixed(1)}
              </span>
            </div>
            <p className="list-item__date">{releaseDate ? format(new Date(releaseDate), 'MMMM d, yyyy') : 'Дата неизвестна'}</p>
            <div className="list-item__genres-wrapper">
              {genreNames.map((genre, index) => (
                <span className="list-item__genre" key={index}>
                  {genre}
                </span>
              ))}
            </div>
            <p className="list-item__description">{maxDescriptionLength(overview)}</p>
            <StarRating myRating={rating} handleRate={(value) => handleRate(value)} />
          </Col>
        </Row>
      </Card>
    </li>
  );
};

export default FilmListItem;
