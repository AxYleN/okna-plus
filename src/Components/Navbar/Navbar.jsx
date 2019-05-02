import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg';
import Cart from 'svg/shopping-cart.svg';

import './Navbar.css';

import cartContext from 'lib/cartContext';

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
        <Link to="/cart" className="navbar__link navbar__cart-group">
          <ReactSVG src={Cart} svgClassName="navbar__cart-icon" />
          <span className="navbar__cart-count-wrapper">{cart.cart.length}</span>
        </Link>
        {backLink}
      </div>
    </nav>
  );
}
