import React, { Component } from 'react';

import './ConfigurationPage.css';
import Blueprint from './Blueprint/Blueprint';
import Params from './Params/Params';
import items from './itemTypes';
import Navbar from '../Navbar/Navbar';

export default class ConfigurationPage extends Component {
  constructor(props) {
    super(props);

    this.item = items[this.props.match.params.item];
    const item = this.item;

    if (!item) {
      this.props.history.push('/');
      return;
    }

    const windows = [];
    for (let i = 0; i < item.windowsCount; i++) {
      windows.push({
        openTo: 'no',
        mosquitoNet: false,
      });
    }

    this.state = {
      params: {
        width: 1400,
        height: 1000,
        profile: 'exprof',
        glass: '24',
        fittings: 'maco',
        windows,
      },
    };
  }

  onChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const params = { ...this.state.params };
    params[name] = value;

    this.setState({ params });
  };

  onWindowChange = (window, id) => {
    const params = { ...this.state.params };
    const windows = [...params.windows];
    windows[id] = window;
    params.windows = windows;

    this.setState({ params });
  };

  componentDidMount() {
    // Сделать запрос к серверу, получить данные о цене
  }

  render() {
    const item = this.item;
    if (!item) return <div>Страница не найдена</div>;

    return (
      <>
        <Navbar backLink="/" />
        <main className="params-container">
          <h1>{item.name}</h1>

          <div className="params__row">
            <Blueprint params={this.state.params} type={item.type} />
            <Params
              onChange={this.onChange}
              onWindowChange={this.onWindowChange}
              params={this.state.params}
            />
          </div>
        </main>
      </>
    );
  }
}
