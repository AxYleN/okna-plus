import React, { Component } from 'react';
import axios from 'axios';

import './ConfigurationPage.css';
import Blueprint from './Blueprint/Blueprint';
import Params from './Params/Params';
import PageLayout from '../PageLayout/PageLayout';
import { calcPrice, calcArea, getOpenToValues } from 'lib';

class ConfigurationPage extends Component {
  state = {
    params: null,
    product: null,
    type: null,
  };

  componentDidMount() {
    axios
      .get(`/api/products/${this.props.match.params.item}`)
      .then(({ data: product }) => {
        const { fields, type } = product;

        if (fields.window) {
          fields.window.values = getOpenToValues(fields.window.values);
        }

        this.getPrice = calcPrice(fields);
        const params = this.getDefaultParams(fields);

        this.setState({ type, product, params }, () => console.log(this.state));
      })
      .catch(err => {
        this.props.history.push('/');
      });
  }

  getDefaultParams(fields) {
    const values = {};

    for (let key in fields) {
      values[key] = this.getDefaultValue(fields[key]);
    }

    return values;
  }

  getDefaultValue(field) {
    switch (field.type) {
      case 'range':
        return field.min;
      case 'select':
        return Object.keys(field.values)[0];
      case 'select-window':
        return Array.from({ length: field.count }, () => ({
          openTo: Object.keys(field.values)[0],
          mosquitoNet: false,
        }));
      default:
        return null;
    }
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

  addToCart = () => {
    this.props.addToCart({
      params: this.state.params,
      count: 1,
      key: this.props.match.params.item,
    });
  };

  render() {
    if (!this.state.product) return <PageLayout>Загрузка...</PageLayout>;

    const { type, product, params } = this.state;
    const { name, fields } = product;

    const price = this.getPrice(params);
    const area = calcArea(params);

    return (
      <PageLayout>
        <div>
          <h1 className="heading">{name}</h1>

          <div className="params-container">
            <Blueprint params={this.state.params} type={type} />
            <Params
              onChange={this.onChange}
              onWindowChange={this.onWindowChange}
              params={params}
              fields={fields}
              price={price}
              area={area}
              addToCart={this.addToCart}
            />
          </div>
        </div>
      </PageLayout>
    );
  }
}

export default ConfigurationPage;
