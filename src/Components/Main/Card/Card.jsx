import React from 'react'
import { Link } from 'react-router-dom';


import './Card.scss';

export default function Card(props) {
  return (
    <Link className="card" to={props.to}>
      <figure>
        <img src={props.img}/>
      </figure>
      <div className="card__info">
        <div>
          {props.text}
        </div>
        &gt;
      </div>
    </Link>
  )
}
