import React, { useEffect, useState } from 'react';
import './AdminOrders.css';
import OrderList from './OrderList/OrderList';
import axios from 'axios';
import RangeInput from './../../../RangeInput/RangeInput';

export default function AdminOrders() {
  const [orders, setOrders] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get('/api/orders', { params: { page } }).then(({ data }) => {
      setOrders(data);
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

  const pagesCount = Math.ceil(orders.ordersCount / 10);
  return (
    <div className="admin-container">
      <h1 className="heading">Заказы</h1>
      <div className="admin-orders-list-wrapper">
        <OrderList orders={orders.orders} onSelect={selectOrder} />
      </div>
      <div className="admin-orders-pagination">
        Страница
        <div className="admin-orders-pagination__input">
          <RangeInput
            value={page}
            min="1"
            style={{ width: `${pagesCount.toString().length + 2}ch` }}
            max={pagesCount}
            onChange={(key, val) => setPage(val)}
          />
        </div>
        из {pagesCount}
      </div>
    </div>
  );
}
