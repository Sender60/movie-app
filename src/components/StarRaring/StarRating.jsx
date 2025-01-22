import React from 'react';
import './StarRating.css';
import { Rate } from 'antd';

const StarRating = ({ myRating, handleRate }) => {
  if (myRating === 0 || myRating === undefined) {
    return (
      <div className="rating">
        <Rate allowHalf count={10} value={0} onChange={(value) => handleRate(value)} />
      </div>
    );
  }
  return (
    <div className="rating">
      <Rate
        allowHalf
        count={10}
        value={myRating}
        onChange={(value) => {
          handleRate(value);
        }}
      />
    </div>
  );
};

export default StarRating;
