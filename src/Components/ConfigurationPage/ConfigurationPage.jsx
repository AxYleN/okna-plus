import React, { Component } from 'react';
import axios from 'axios';

import './ConfigurationPage.css';
import Blueprint from './Blueprint/Blueprint';
import Params from './Params/Params';
import items from './itemTypes';
import Navbar from '../Navbar/Navbar';

export default class ConfigurationPage extends Component {
  constructor(props) {
    super(props);

    this.url = this.props.match.params.item;
    this.item = items[this.url];
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
      type: undefined,
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

  async componentDidMount() {
    axios
      .get(`/api/products/${this.url}`)
      .then(({ data }) => {
        const product = data;
        const fields = product.fields;
        const type = fields.type;
        delete fields.type;

        if (fields.window) {
          const val = fields.window.values;
          const newVal = {};
          newVal['no'] = val.blank;
          newVal['tilt'] = val.tilt;

          newVal['toLeft'] = { ...val.turn };
          newVal['toLeft'].text = 'Поворотное влево';
          newVal['toRight'] = { ...val.turn };
          newVal['toRight'].text = 'Поворотное вправо';

          newVal['tilt_toLeft'] = { ...val.tiltAndTurn };
          newVal['tilt_toLeft'].text = 'Поворотно-откидное влево';
          newVal['tilt_toRight'] = { ...val.tiltAndTurn };
          newVal['tilt_toRight'].text = 'Поворотно-откидное вправо';

          fields.window.values = newVal;
        }

        this.setState({ type, product });
      })
      .catch(err => {
        this.props.history.push('/');
      });
  }

  render() {
    const item = this.item;
    if (!item) return <div>Страница не найдена</div>;
    const fields = this.state.product ? this.state.product.fields : null;

    return (
      <>
        <Navbar backLink="/" />
        <main className="params-container">
          <h1>{item.name}</h1>

          <div className="params__row">
            <Blueprint params={this.state.params} type={this.state.type} />
            <Params
              onChange={this.onChange}
              onWindowChange={this.onWindowChange}
              params={this.state.params}
              fields={fields}
            />
          </div>
        </main>
      </>
    );
  }
}
