import React from 'react';
import './StarRating.css';

const StarRating = ({ rating }) => {
  const stars = Array(10)
    .fill(null)
    .map((_, index) => {
      const className = index < rating ? 'star filled' : 'star';
      return (
        // eslint-disable-next-line react/no-array-index-key
        <span key={index} className={className}>
          {index < rating ? '\u2605' : '\u2606'}
        </span>
      );
    });

  return <div className="rating">{stars}</div>;
};

export default StarRating;
