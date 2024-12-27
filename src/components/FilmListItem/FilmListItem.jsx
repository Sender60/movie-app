/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Col, Row, Card, Image } from 'antd';
import './FilmListItem.css';
import { format } from 'date-fns';
import Genre from '../Genre/Genre';

const FilmListItem = () => {
  const maxDescriptionLength = (text) => {
    if (text.length < 100) {
      return text;
    }
    let truncatedText = '';
    let currentLength = 0;
    const words = text.split(' ');
    words.forEach((word) => {
      if (currentLength + word.length + 1 < 100) {
        truncatedText += `${word}`;
        currentLength += word.length + 1;
      }
    });
    return `${truncatedText.trim()}...`;
  };

  const date = new Date('2020-03-05');

  const genres = ['Драма', 'Комедия', 'Боевик'];
  return (
    <li key={Math.random()} className="list-item">
      <Card
        style={{
          width: 400,
          padding: 0,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
        styles={{ body: { padding: 0 } }}
      >
        <Row gutter={16} wrap={false}>
          <Col>
            <Image
              width={200}
              src="https://www.gamersdecide.com/sites/default/files/authors/u156792/death_speaker_blackthorn.jpg"
            />
          </Col>
          <Col>
            <h2 className="list-item__title">Movie title</h2>
            <p className="list-item__date">{format(date, 'MMMM d, yyyy')}</p>
            <div className="list-item__genres">
              {true && genres.map((genre, index) => <Genre genre={genre} key={index} />)}
            </div>
            <p className="list-item__description">
              {maxDescriptionLength(
                'Один Два Три Четыре Пять Шесть Семь Восемь девять Десять Один Два Три Четыре Пять Шесть Семь Восвйцвцвцувцувцувцуву',
              )}
            </p>
          </Col>
        </Row>
      </Card>
    </li>
  );
};

export default FilmListItem;
