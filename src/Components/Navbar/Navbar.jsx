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
          <Link to="/">
            <h2 className="navbar__header">
                Окна-Плюс
            </h2>
          </Link>
        {backLink}
      </div>
    </nav>
  );
}
