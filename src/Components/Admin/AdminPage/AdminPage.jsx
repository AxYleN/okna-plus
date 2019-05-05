import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './AdminPage.css';

import AdminNav from './AdminNav/AdminNav';
import AdminProducts from './AdminProducts/AdminProducts';
import AdminOrders from './AdminOrders/AdminOrders';
import axios from 'axios';

export default function AdminPage(props) {
  const matchUrl = props.match.url;

  if (!window.localStorage.getItem('jwt')) {
    return <Redirect to={matchUrl + '/login'} />;
  }

  useEffect(() => {
    axios.get('/api/user').catch(err => {
      window.localStorage.removeItem('jwt');
      props.history.push(matchUrl + '/login');
    });
  }, []);

  const logout = () => {
    window.localStorage.removeItem('jwt');
    axios.defaults.headers.common['Authorization'] = undefined;
    props.history.push('/admin/login');
  };

  return (
    <div className="admin__container">
      <aside className="admin__sidebar no-print">
        <AdminNav matchUrl={matchUrl} />
        <button className="btn btn--text admin__logout-btn" onClick={logout}>
          Выйти
        </button>
      </aside>
      <main className="admin__main-container">
        <Switch>
          <Route path={matchUrl + '/products'} component={AdminProducts} />
          <Route path={matchUrl + '/orders'} component={AdminOrders} />
          <Redirect to={matchUrl + '/orders'} />
        </Switch>
      </main>
    </div>
  );
}
