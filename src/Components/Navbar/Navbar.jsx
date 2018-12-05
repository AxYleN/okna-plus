import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import './Navbar.css';

export default function Navbar(props) {
  return (
    <div className="navbar">
      <div className="navbar__container">
        
        <h2><Link to="/" className="navbar__header">Окна-Плюс</Link></h2>

        <Switch>
          <Route path="/" exact /> {/* Отображает кнопку "Назад" везде, кроме главной страницы */}
          <Route
            component={() => (
              <Link className="navbar__link" to="/">
                &lt; Назад
              </Link>
            )}
          />
        </Switch>
      </div>
    </div>
  );
}
