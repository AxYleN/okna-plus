import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './AdminPage.css';

export default function AdminPage(props) {
  const matchUrl = props.match.url;

  return (
    <div>
      <aside>Сайдбар</aside>
      <main>
        <Switch>
          <Route path={matchUrl + '/price'} component={() => 'Цены'} />
          <Route path={matchUrl + '/orders'} component={() => 'Заказы'} />
          <Redirect to={matchUrl + '/orders'} />
        </Switch>
      </main>
    </div>
  );
}
