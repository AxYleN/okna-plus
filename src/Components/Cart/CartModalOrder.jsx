import React, { useState } from 'react';

import Modal from '../Modal/Modal';

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
            required
          />
          <input
            className={inputClass}
            name="fname"
            placeholder="Имя*"
            value={customer.fname}
            onChange={handleInput}
            required
          />
          <input
            className={inputClass}
            name="patronymic"
            placeholder="Отчество"
            value={customer.patronymic}
            onChange={handleInput}
          />
          <input
            className={inputClass}
            name="phone"
            placeholder="Номер телефона*"
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
            <button type="button" className="btn" onClick={onClose}>
              Отмена
            </button>
            <button className="btn cart-modal-order__btn">Оформить заказ</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}