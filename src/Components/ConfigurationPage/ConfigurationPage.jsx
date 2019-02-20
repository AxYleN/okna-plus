import React, { Component } from 'react';
import axios from 'axios';

import './ConfigurationPage.css';
import Blueprint from './Blueprint/Blueprint';
import Params from './Params/Params';
import Navbar from '../Navbar/Navbar';

class ConfigurationPage extends Component {
  state = {
    params: null,
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
        this.setState({ type, product, params }, () => console.log(this.state));
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

  render() {
    if (!this.state.product) return <Navbar backLink="/" />;
    const { type, product, params } = this.state;
    const { name, fields } = product;

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
            />
          </div>
        </main>
      </>
    );
  }
}

export default ConfigurationPage;
