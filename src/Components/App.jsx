import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './MainPage/MainPage';
import ConfigurationPage from './ConfigurationPage/ConfigurationPage';
import Admin from './Admin/Admin';
import Cart from './Cart/Cart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <>
            <Switch>
              <Route path="/admin" component={Admin} />
              <Route path="/cart" component={Cart} />
              <Route path="/:item" component={ConfigurationPage} />
              <Route path="/" component={MainPage} />
            </Switch>
          </>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
