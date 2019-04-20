import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

import cartContext from '../../cartContext';

export default function Navbar(props) {
  let backLink = null;
  const cart = useContext(cartContext);

  if (props.backLink) {
    backLink = (
      <Link className="navbar__link navbar__link--back" to={props.backLink}>
        &lt; Назад
      </Link>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/">
          <h2 className="navbar__header">Окна-Плюс</h2>
        </Link>
        <Link to="/cart" className="navbar__link">
          Корзина: {cart.cart.length}
        </Link>
        {backLink}
      </div>
    </nav>
  );
}
