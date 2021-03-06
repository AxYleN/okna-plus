import React, { useEffect, useState } from 'react';
import './AdminOrders.css';
import OrderList from './OrderList/OrderList';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import RangeInput from './../../../RangeInput/RangeInput';
import OrderInfo from './OrderInfo/OrderInfo';
import AdminOrdersSearch from './AdminOrdersSearch';
import ReactSVG from 'react-svg';
import Arrow from 'svg/chevron-left.svg';

export default function AdminOrders(props) {
  const [orders, setOrders] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({
    num: '',
    fio: '',
    phone: '',
  });

  function getOrders() {
    axios
      .get('/api/orders', { params: { page, ...search } })
      .then(({ data }) => {
        setOrders(data);
      })
      .catch(err => {
        if (err.response.status === 401) {
          return props.history.push('/admin/login');
        }
        setOrders(undefined);
      });
  }

  useEffect(() => {
    getOrders();
  }, [page, search]);

  useEffect(() => {
    document.title = 'Окна-Плюс | Заказы';
  });

  if (orders === null) {
    return (
      <div className="admin-container">
        <h1 className="heading">Заказы</h1>
        Загрузка...
      </div>
    );
  }

  const pagesCount = Math.ceil(orders.ordersCount / 10);
  const url = props.match.url;
  return (
    <div className="admin-container">
      <div className="no-print">
        <h1 className="heading">Заказы</h1>
        <AdminOrdersSearch
          onChange={val => {
            setPage(1);
            setSearch(val);
          }}
          search={search}
        />
        {orders === undefined || orders.ordersCount === 0 ? (
          'Заказы не найдены.'
        ) : (
          <>
            <div className="admin-orders-list-wrapper">
              <OrderList orders={orders.orders} url={url} />
            </div>
            <div className="admin-orders-pagination">
              <button
                disabled={page < 2}
                className="btn btn--text admin-orders-pagination__btn"
                onClick={() => setPage(page - 1)}>
                <ReactSVG src={Arrow} svgClassName="admin-orders-prev-icon" />
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
                <ReactSVG src={Arrow} svgClassName="admin-orders-next-icon" />
              </button>
            </div>
          </>
        )}
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
