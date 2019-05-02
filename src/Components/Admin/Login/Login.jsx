import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';

export default function Login(props) {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('/api/user', { password })
      .then(({ data }) => {
        axios.defaults.headers.common['Authorization'] = data.token;
        window.localStorage.setItem('jwt', data.token);

        props.history.push('/admin');
      })
      .catch(err => {
        setErrorMessage(<div className="login__error">Пароль введён неверно</div>);
      });
  }

  useEffect(() => {
    document.title = 'Окна-плюс | Авторизация';
  }, []);

  return (
    <div className="login__wrapper">
      <form className="login__form" onSubmit={handleSubmit}>
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
          {errorMessage}
        </label>
        <button className="btn login__btn">Войти</button>
      </form>
    </div>
  );
}
