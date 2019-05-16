import React, { useState } from 'react';
import MaskedInput from 'react-text-mask';

import Modal from '../Modal/Modal';

const phoneMask = [
  '+',
  '7',
  ' ',
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

export default function CartModalOrder({ price, onClose, onOrder }) {
  const [customer, setCustomer] = useState({
    lname: '',
    fname: '',
    patronymic: '',
    phone: '',
    addess: '',
    email: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    onOrder(customer);
  }

  function handleInput({ target }) {
    const { name, value } = target;
    setCustomer({ ...customer, [name]: value });
  }

  function handleKeypress(e) {
    if (!/[а-яА-Я-]/i.test(e.key)) {
      e.preventDefault();
    }
  }

  const inputClass = 'cart-modal-order__input';
  return (
    <Modal onClose={onClose}>
      <div className="cart-modal-order">
        <h2 className="heading">Оформление заказа</h2>
        <h3 className="cart-modal-order__lead">на сумму: {price} руб.</h3>
        <form onSubmit={handleSubmit} className="cart-modal-order__form">
          <input
            className={inputClass}
            name="lname"
            placeholder="Фамилия*"
            value={customer.lname}
            onChange={handleInput}
            onKeyPress={handleKeypress}
            pattern="[а-яА-Я-]{2,}"
            required
          />
          <input
            className={inputClass}
            name="fname"
            placeholder="Имя*"
            value={customer.fname}
            onChange={handleInput}
            onKeyPress={handleKeypress}
            pattern="[а-яА-Я-]{2,}"
            required
          />
          <input
            className={inputClass}
            name="patronymic"
            placeholder="Отчество"
            value={customer.patronymic}
            onChange={handleInput}
            onKeyPress={handleKeypress}
            pattern="[а-яА-Я-]{2,}"
          />
          <MaskedInput
            mask={phoneMask}
            className={inputClass}
            name="phone"
            placeholder="Номер телефона*"
            onFocus={e => (e.target.placeholder = '+7 (___) ___-__-__')}
            onBlur={e => (e.target.placeholder = 'Номер телефона*')}
            type="tel"
            value={customer.phone}
            onChange={handleInput}
            required
          />
          <input
            className={inputClass}
            name="addess"
            placeholder="Адрес доставки*"
            value={customer.addess}
            onChange={handleInput}
            required
          />
          <input
            className={inputClass}
            name="email"
            placeholder="E-mail"
            type="email"
            value={customer.email}
            onChange={handleInput}
          />
          <div className="cart-modal-order__buttons">
            <button type="button" className="btn btn--text modal__btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button className="btn cart-modal-order__btn">Оформить заказ</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
