import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './MainPage/MainPage';
import ConfigurationPage from './ConfigurationPage/ConfigurationPage';
import Admin from './Admin/Admin';
import Cart from './Cart/Cart';

import cartContext from 'lib/cartContext';
import axios from 'axios';

class App extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    const cart = JSON.parse(window.localStorage.getItem('cart')) || [];
    this.setState({ cart });

    const jwt = window.localStorage.getItem('jwt');
    if (jwt) {
      axios.defaults.headers.common['Authorization'] = jwt;
    }

    window.addEventListener('storage', e => {
      if (e.key === 'cart') {
        const cart = JSON.parse(window.localStorage.getItem('cart')) || this.state.cart;
        this.setState({ cart });
      }
      if (e.key === 'jwt') {
        axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('jwt');
      }
    });
  }

  changeProductAtId = (product, id) => {
    const cart = [...this.state.cart];
    cart[id] = { ...cart[id], ...product };
    this.saveCart(cart);
  };

  addToCart = product => {
    const cart = [...this.state.cart, product];
    this.saveCart(cart);
  };

  removeFromCart = id => {
    const cart = this.state.cart.filter((el, elId) => elId !== id);
    this.saveCart(cart);
  };

  clearCart = () => {
    const cart = [];
    this.saveCart(cart);
  };

  saveCart = cart => {
    this.setState({ cart });
    window.localStorage.setItem('cart', JSON.stringify(cart));
  };

  render() {
    const {
      state,
      removeFromCart: remove,
      changeProductAtId: change,
      addToCart: add,
      clearCart: clear,
    } = this;

    return (
      <div className="App">
        <cartContext.Provider value={state}>
          <BrowserRouter>
            <>
              <Switch>
                <Route path="/admin" component={Admin} />
                <Route
                  path="/cart"
                  render={props => (
                    <Cart {...props} removeProduct={remove} changeAtId={change} clearCart={clear} />
                  )}
                />
                <Route
                  path="/:item"
                  render={props => <ConfigurationPage {...props} addToCart={add} />}
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
