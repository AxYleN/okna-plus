import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import './Navbar.scss';

export default function Navbar(props) {
  
  return (
    <div className="navbar">
      <div className="container">
        <h2>Окна-Плюс</h2>

        <Switch>
          <Route path="/" exact /> {/* Отображает кнопку "Назад" везде, кроме главной страницы */}
          <Route
            component={() => (
              <Link className="link" to="/">
                &lt; Назад
              </Link>)}
          />
        </Switch>
        
        
      </div>
    </div>
  )
}
