import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './AdminPage.css';

import AdminNav from './AdminNav/AdminNav';
import AdminProducts from './AdminProducts/AdminProducts';
import AdminOrders from './AdminOrders/AdminOrders';

export default function AdminPage(props) {
  const matchUrl = props.match.url;

  return (
    <div className="admin__container">
      <aside className="admin__sidebar">
        <AdminNav matchUrl={matchUrl} />
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
