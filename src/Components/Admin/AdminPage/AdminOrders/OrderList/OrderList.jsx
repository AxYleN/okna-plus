import React from 'react';
import { Link } from 'react-router-dom';
import './OrderList.css';
import { formatNumber } from 'lib';

const dateFormat = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export default function OrderList({ orders, url }) {
  return (
    <table className="order-list">
      <thead className="order-list__header">
        <tr>
          <th className="order-list__th order-list__tar">№</th>
          <th className="order-list__th">Фамилия, Имя</th>
          <th className="order-list__th">Дата заказа</th>
          <th className="order-list__th">Телефон</th>
          <th className="order-list__th order-list__tar">Сумма</th>
          <th className="order-list__th" />
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr className="order-list__tr" key={order.id}>
            <td className="order-list__td order-list__id order-list__tar">{order.id}</td>
            <td className="order-list__td order-list__name">
              {order.client.lname} {order.client.fname}
            </td>
            <td
              className="order-list__td order-list__small order-list__tac"
              title={new Date(order.date).toLocaleString()}>
              {new Date(order.date).toLocaleString('ru', dateFormat)}
            </td>
            <td className="order-list__td order-list__small order-list__tac">
              <a href={'tel:' + order.client.phone} tabIndex="-1">
                {order.client.phone}
              </a>
            </td>
            <td className="order-list__td order-list__small order-list__tar">
              {formatNumber(order.price)} руб.
            </td>
            <td className="order-list__td order-list__more">
              <Link to={`${url}/${order.id}`} className="btn btn--text order-list__btn">
                Подробнее
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
