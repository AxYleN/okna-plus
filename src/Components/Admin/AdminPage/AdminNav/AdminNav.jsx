import React from 'react';
import { NavLink } from 'react-router-dom';

import './AdminNav.css';

export default function AdminNav(props) {
  const matchUrl = props.matchUrl;
  const linkStyles = {
    className: 'admin-nav__link',
    activeClassName: 'admin-nav__link--active',
  };

  return (
    <nav className="admin-nav">
      <NavLink {...linkStyles} to={matchUrl + '/orders'}>
        Список заказов
      </NavLink>
      <NavLink {...linkStyles} to={matchUrl + '/stats'}>
        Статистика
      </NavLink>
      <NavLink {...linkStyles} to={matchUrl + '/products'}>
        Товары
      </NavLink>
      <a href="/ref.pdf" className="admin-nav__link admin-nav__ref-system">
        Справочная система
      </a>
    </nav>
  );
}
