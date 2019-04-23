import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './MainPage/MainPage';
import ConfigurationPage from './ConfigurationPage/ConfigurationPage';
import Admin from './Admin/Admin';
import Cart from './Cart/Cart';

import cartContext from 'lib/cartContext';

class App extends Component {
  state = {
    cart: [],
    editId: -1,
  };

  componentDidMount() {
    this.setState({
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
    });
  }

  addToCart = product => {
    this.setState({
      cart: [...this.state.cart, product],
    });
  };

  removeFromCart = id => {
    this.setState({
      cart: this.state.cart.filter((el, elId) => elId !== id),
    });
  };

  render() {
    return (
      <div className="App">
        <cartContext.Provider value={this.state}>
          <BrowserRouter>
            <>
              <Switch>
                <Route path="/admin" component={Admin} />
                <Route path="/cart" component={Cart} />
                <Route
                  path="/:item"
                  render={props => <ConfigurationPage {...props} addToCart={this.addToCart} />}
                />
                <Route path="/" component={MainPage} />
              </Switch>
            </>
          </BrowserRouter>
        </cartContext.Provider>
      </div>
    );
  }
}

export default App;
