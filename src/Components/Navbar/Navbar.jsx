import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg';
import Cart from 'svg/shopping-cart.svg';
import Back from 'svg/chevron-left.svg';

import './Navbar.css';

import cartContext from 'lib/cartContext';

export default function Navbar(props) {
  let backLink = null;
  const cart = useContext(cartContext);

  if (props.backLink) {
    backLink = (
      <Link className="navbar__link navbar__link--back" to={props.backLink}>
        <ReactSVG src={Back} svgClassName="navbar__back" /> Назад
      </Link>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/">
          <h2 className="navbar__header">Окна-Плюс</h2>
        </Link>
        <Link to="/cart" className="navbar__link navbar__cart-group" aria-label="Корзина">
          <ReactSVG src={Cart} svgClassName="navbar__cart-icon" />
          <span className="navbar__cart-count-wrapper">{cart.cart.length}</span>
          <p className="navbar__cart-label">Корзина</p>
        </Link>
        {backLink}
      </div>
    </nav>
  );
}
