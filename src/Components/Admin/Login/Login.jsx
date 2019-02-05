import React from 'react';
import './Login.css';

export default function Login(props) {
  return (
    <div className="login__wrapper">
      <form className="login__form">
        <h2>Войти</h2>
        <label>
          <h5>Пароль</h5>
          <input type="password" className="login__input" />
        </label>
        <button className="login__btn">Войти</button>
      </form>
    </div>
  );
}
