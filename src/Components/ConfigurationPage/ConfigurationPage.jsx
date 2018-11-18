import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ConfigurationPage.css';
import Blueprint from './Blueprint/Blueprint';
import Params from './Params/Params';
import items from './itemTypes';

export default class ConfigurationPage extends Component {
  constructor(props) {
    super(props);

    const item = items[this.props.match.params.item];
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

  render() {
    const item = items[this.props.match.params.item];
    if (!item) return <div>Страница не найдена</div>;

    return (
      <div className="params-container">
        <h1>{item.name}</h1>
        <Link className="link" to="/">
          &lt; Назад
        </Link>

        <div className="params__row">
          <Blueprint params={this.state.params} />
          <Params
            onChange={this.onChange}
            onWindowChange={this.onWindowChange}
            params={this.state.params}
          />
        </div>
      </div>
    );
  }
}
