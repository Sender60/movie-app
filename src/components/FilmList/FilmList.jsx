import React from 'react';
import FilmListItem from '../FilmListItem/FilmListItem';
import './FilmList.css';

const FilmList = () => {
  <ul className="film-list">
    {Array(6)
      .fill(0)
      .map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <FilmListItem key={index} />
      ))}
  </ul>;
};

export default FilmList;
