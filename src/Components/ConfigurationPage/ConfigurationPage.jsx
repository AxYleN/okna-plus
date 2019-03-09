import React, { Component } from 'react';
import axios from 'axios';

import './ConfigurationPage.css';
import Blueprint from './Blueprint/Blueprint';
import Params from './Params/Params';
import Navbar from '../Navbar/Navbar';

class ConfigurationPage extends Component {
  state = {
    params: null,
    prices: null,
    product: null,
    type: null,
  };

  componentDidMount() {
    axios
      .get(`/api/products/${this.props.match.params.item}`)
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

        const params = this.getDefaultParams(fields);
        const prices = this.getPriceList(fields);
        this.setState({ type, product, params, prices }, () =>
          console.log(this.state),
        );
      })
      .catch(err => {
        this.props.history.push('/');
      });
  }

  getDefaultParams(fields) {
    const values = {};

    for (let key in fields) {
      let field = fields[key];

      let defValue = this.getDefaultValue(fields[key]);

      if (key === 'window') {
        defValue = Array.from({ length: field.count }, () => ({
          openTo: defValue,
          mosquitoNet: false,
        }));
      }

      values[key] = defValue;
    }

    return values;
  }

  getDefaultValue(field) {
    switch (field.type) {
      case 'range':
        return field.min;
      case 'select':
        return Object.keys(field.values)[0];
      default:
        return null;
    }
  }

  getPriceList(fields) {
    const prices = {};

    for (let key in fields) {
      const field = fields[key];
      if (field.type === 'range') continue;

      const values = {};
      prices[key] = values;

      for (let key in field.values) {
        values[key] = field.values[key].price || 0;
      }
    }

    return prices;
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
    const windows = [...params.window];
    windows[id] = window;
    params.window = windows;

    this.setState({ params });
  };

  getCurrentPrices() {
    const { params, prices } = this.state;
    const cPrices = {};

    for (let key in params) {
      let price = prices[key];
      if (!price) continue;

      if (!Array.isArray(params[key])) {
        cPrices[key] = price[params[key]];
        continue;
      }

      cPrices[key] = params[key].reduce((acc, window) => {
        let val = price[window.openTo];

        if (window.mosquitoNet) {
          val += this.state.product.fields.window.mosquitoNet;
        }

        return acc + val;
      }, 0);
    }

    return cPrices;
  }

  getPrice() {
    const prices = this.getCurrentPrices();

    const area = this.getArea();
    const costPerSqrM = prices.profile + prices.glass;
    delete prices.profile;
    delete prices.glass;

    let price = costPerSqrM * area;

    for (let key in prices) {
      price += prices[key];
    }

    return price;
  }

  getArea() {
    const params = this.state.params;
    return (params.width * params.height) / 1000000;
  }

  render() {
    if (!this.state.product) return <Navbar backLink="/" />;
    const { type, product, params } = this.state;
    const { name, fields } = product;

    let price = this.getPrice();
    let area = this.getArea();

    return (
      <>
        <Navbar backLink="/" />
        <main className="params-container">
          <h1>{name}</h1>

          <div className="params__row">
            <Blueprint params={this.state.params} type={type} />
            <Params
              onChange={this.onChange}
              onWindowChange={this.onWindowChange}
              params={params}
              fields={fields}
              price={price}
              area={area}
            />
          </div>
        </main>
      </>
    );
  }
}

export default ConfigurationPage;
