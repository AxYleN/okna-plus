import React, { useState, useEffect } from 'react';
import './Login.css';

export default function Login(props) {
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Окна-плюс | Авторизация';
  }, []);

  return (
    <div className="login__wrapper">
      <form className="login__form">
        <h1 className="heading login__heading">Авторизация</h1>
        <label>
          <input
            type="password"
            className="login__input"
            placeholder="Пароль"
            autoComplete="off"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button className="btn login__btn">Войти</button>
      </form>
    </div>
  );
}
