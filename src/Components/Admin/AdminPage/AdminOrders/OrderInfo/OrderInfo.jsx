import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderInfo.css';

import Modal from '../../../../Modal/Modal';
import ProductCard from '../../../../ProductCard/ProductCard';
import OrderInfoPrint from './OrderInfoPrint';

export default function OrderInfo({ orderId, onClose }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/orders/${orderId}`)
      .then(({ data }) => {
        setOrder(data);
      })
      .catch(onClose);
  }, [orderId]);

  if (order === null) {
    return (
      <Modal onClose={onClose}>
        <div className="admin-order-info">
          <h2 className="heading">Загрузка</h2>
        </div>
      </Modal>
    );
  }

  const { order: orderInfo, cart } = order;
  const client = orderInfo.client;
  return (
    <>
      <Modal onClose={onClose}>
        <div className="admin-order-info">
          <button className="btn btn--text admin-order-info__close-btn" onClick={onClose}>
            &times;
          </button>
          <div className="admin-order-info__header">
            <h2 className="heading">Заказ № {orderInfo.id}</h2>
          </div>
          <div className="admin-order-info__date">
            от {new Date(orderInfo.date).toLocaleString()}
          </div>
          <div className="admin-order-info__info">
            <OrderClientInfo title="ФИО">
              {`${client.lname} ${client.fname} ${client.patronymic}`}
            </OrderClientInfo>
            <OrderClientInfo title="Телефон">
              <a href={`tel:${client.phone}`}>{client.phone}</a>
            </OrderClientInfo>
            <OrderClientInfo title="Адрес">{client.addess}</OrderClientInfo>
            <OrderClientInfo title="Email">
              {client.email ? <a href={`mailto:${client.email}`}>{client.email}</a> : '—'}
            </OrderClientInfo>
          </div>
          <div className="admin-order-info__cart">
            <div className="admin-order-info__cart-header">
              Список товаров
              <span className="admin-order-info__status">Статус: {orderInfo.status}</span>
            </div>
            <hr />
            {cart.map((product, id) => (
              <React.Fragment key={id}>
                <ProductCard {...product} />
                <hr />
              </React.Fragment>
            ))}
          </div>
          <div className="admin-order-info__footer">
            <div>
              <strong>Итого:</strong> {orderInfo.price.toFixed(2)} руб.
            </div>
            <div className="admin-order-info__footer-buttons">
              <button className="btn" onClick={() => window.print()}>Распечатать</button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="print-only">
        <OrderInfoPrint {...order} />
      </div>
    </>
  );
}

function OrderClientInfo({ title, children }) {
  return (
    <div className="admin-order-client-info">
      <div className="admin-order-client-info__title">{title}</div>
      <div className="admin-order-client-info__value">{children}</div>
    </div>
  );
}
