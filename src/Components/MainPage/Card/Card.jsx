import React from 'react';
import { Link } from 'react-router-dom';

import './Card.css';

export default function Card({ to, img, text }) {
  return (
    <Link className="card" to={to}>
      <figure className="card__img-container">
        <img src={img} className="card__img" alt={text} />
      </figure>
      <div className="card__info">{text}</div>
    </Link>
  );
}
