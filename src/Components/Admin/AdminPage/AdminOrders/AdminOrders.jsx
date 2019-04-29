import React, { useEffect, useState } from 'react';
import './AdminOrders.css';
import OrderList from './OrderList/OrderList';
import axios from 'axios';
import RangeInput from './../../../RangeInput/RangeInput';

export default function AdminOrders() {
  const [orders, setOrders] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get('/api/orders', { params: { page } })
      .then(({ data }) => {
        setOrders(data);
      })
      .catch(err => {
        setOrders(undefined);
      });
  }, [page]);

  function selectOrder(id) {
    console.log(id);
  }

  if (orders === null) {
    return (
      <div className="admin-container">
        <h1 className="heading">Заказы</h1>
        Загрузка...
      </div>
    );
  }
  if (orders === undefined) {
    return (
      <div className="admin-container">
        <h1 className="heading">Заказы</h1>
        Заказы не найдены.
      </div>
    );
  }

  const pagesCount = Math.ceil(orders.ordersCount / 10);
  return (
    <div className="admin-container">
      <h1 className="heading">Заказы</h1>
      <div className="admin-orders-list-wrapper">
        <OrderList orders={orders.orders} onSelect={selectOrder} />
      </div>
      <div className="admin-orders-pagination">
        <button
          disabled={page < 2}
          className="btn btn--text admin-orders-pagination__btn"
          onClick={() => setPage(page - 1)}>
          &lt;
        </button>
        Страница
        <div className="admin-orders-pagination__input">
          <RangeInput
            value={page}
            key={page}
            min="1"
            style={{ width: `${pagesCount.toString().length + 2}ch` }}
            max={pagesCount}
            onChange={(key, val) => setPage(+val)}
          />
        </div>
        из {pagesCount}
        <button
          disabled={page >= pagesCount}
          className="btn btn--text admin-orders-pagination__btn"
          onClick={() => setPage(page + 1)}>
          &gt;
        </button>
      </div>
    </div>
  );
}