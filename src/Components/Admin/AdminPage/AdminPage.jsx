import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './AdminPage.css';

import AdminNav from './AdminNav/AdminNav';
import AdminProducts from './AdminProducts/AdminProducts';
import AdminOrders from './AdminOrders/AdminOrders';

function isLoggedIn() {
  return true;
}

export default function AdminPage(props) {
  const matchUrl = props.match.url;

  if (!isLoggedIn()) {
    return <Redirect to={matchUrl + '/login'} />;
  }

  return (
    <div className="admin__container">
      <aside className="admin__sidebar no-print">
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
