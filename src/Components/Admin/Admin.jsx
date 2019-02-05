import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login/Login';
const AdminPage = React.lazy(() => import('./AdminPage/AdminPage'));

export default function Admin(props) {
  const matchUrl = props.match.url;

  // Если не залогинился - перенаправить на страницу логина
  // Если залогинился - перенаправить на страницу с ценами

  return (
    <div>
      <Suspense fallback="Загрузка...">
        <Switch>
          <Route path={matchUrl + '/login'} component={Login} />
          <Route path={matchUrl + '/'} component={AdminPage} />
        </Switch>
      </Suspense>
    </div>
  );
}
