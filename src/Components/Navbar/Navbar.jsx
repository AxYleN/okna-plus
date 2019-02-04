import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

export default function Navbar(props) {
  let backLink = null;

  if (props.backLink) {
    backLink = (
      <Link className="navbar__link" to={props.backLink}>
        &lt; Назад
      </Link>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <h2>
          <Link to="/" className="navbar__header">
            Окна-Плюс
          </Link>
        </h2>
        {backLink}
      </div>
    </nav>
  );
}
