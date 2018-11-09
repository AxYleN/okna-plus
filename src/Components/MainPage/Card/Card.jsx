import React from 'react';
import { Link } from 'react-router-dom';

import './Card.css';

export default function Card(props) {
  return (
    <Link className="card" to={props.to}>
      <figure className="card__img-container">
        <img src={props.img} className="card__img" alt={props.text} />
      </figure>
      <div className="card__info">
        <div>{props.text}</div>&gt;
      </div>
    </Link>
  );
}
