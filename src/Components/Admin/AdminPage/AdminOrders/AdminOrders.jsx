import React, { useEffect, useState } from 'react';
import './AdminOrders.css';
import OrderList from './OrderList/OrderList';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import RangeInput from './../../../RangeInput/RangeInput';
import OrderInfo from './OrderInfo/OrderInfo';

export default function AdminOrders(props) {
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

  useEffect(() => {
    document.title = 'Окна-плюс | Заказы';
  });

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
  const url = props.match.url;
  return (
    <div className="admin-container">
      <div className="no-print">
        <h1 className="heading">Заказы</h1>
        <div className="admin-orders-list-wrapper">
          <OrderList orders={orders.orders} url={url} />
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
      <Switch>
        <Route
          path={url + '/:id'}
          render={props => (
            <OrderInfo
              {...props}
              orderId={props.match.params.id}
              onClose={() => props.history.push(url)}
            />
          )}
        />
      </Switch>
    </div>
  );
}
