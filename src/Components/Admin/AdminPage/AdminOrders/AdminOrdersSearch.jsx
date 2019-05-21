import React, { useState, useCallback } from 'react';
import PhoneInput from './../../../PhoneInput/PhoneInput';

function debounce(f, ms) {
  let timer = null;

  return function(...args) {
    const onComplete = () => {
      f.apply(this, args);
      timer = null;
    };

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(onComplete, ms);
  };
}

export default function AdminOrdersSearch({ onChange, search }) {
  const [state, setState] = useState(search);
  const onChangeDebounce = useCallback(debounce(onChange, 300), []);

  const handleOnChange = e => {
    const { name, value } = e.target;
    const newState = { ...state, [name]: value };

    setState(newState);

    onChangeDebounce(newState);
  };

  const handleKeypress = useCallback(e => {
    const regExp = e.target.name === 'fio' ? /[а-яА-Я- ]/i : /[0-9]/i;

    if (!regExp.test(e.key)) {
      e.preventDefault();
    }
  }, []);

  return (
    <div className="admin-orders-list-search">
      <input
        type="text"
        className="input"
        placeholder="№"
        name="num"
        onChange={handleOnChange}
        onKeyPress={handleKeypress}
        value={state.num}
        style={{ width: '4rem' }}
        maxLength="5"
        autoComplete="off"
      />
      <input
        type="text"
        className="input"
        placeholder="ФИО"
        name="fio"
        onChange={handleOnChange}
        onKeyPress={handleKeypress}
        value={state.fio}
        autoComplete="off"
      />
      <PhoneInput
        className="input"
        placeholder="Номер телефона"
        name="phone"
        onChange={handleOnChange}
        value={state.phone}
        style={{ width: '10rem' }}
        autoComplete="off"
      />
    </div>
  );
}
