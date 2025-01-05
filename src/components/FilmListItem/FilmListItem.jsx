/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Col, Row, Card, Image } from 'antd';
import './FilmListItem.css';
import { format } from 'date-fns';
import Genre from '../Genre/Genre';
import StarRating from '../StarRaring/StarRating';
import maxDescriptionLength from '../utils/util';

const FilmListItem = ({ movie }) => {
  const { title, overview, poster_path: posterPath, vote_average: rating, release_date: releaseDate } = movie;

  const genres = ['Драма', 'Комедия', 'Боевик'];
  return (
    <li key={Math.random()} className="list-item">
      <Card
        style={{
          width: 450,
          padding: 0,
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
          <Col>
            <h3 className="list-item__title">{title}</h3>
            <p className="list-item__date">{releaseDate ? format(new Date(releaseDate), 'MMMM d, yyyy') : 'Дата неизвестна'}</p>
            <div className="list-item__genres">
              {genres.map((genre, index) => (
                <Genre genre={genre} key={index} />
              ))}
            </div>
            <p className="list-item__description">{maxDescriptionLength(overview)}</p>
            <StarRating rating={rating} />
          </Col>
        </Row>
      </Card>
    </li>
  );
};

export default FilmListItem;
