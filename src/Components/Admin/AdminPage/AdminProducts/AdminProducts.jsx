import React, { Component } from 'react';
import axios from 'axios';

import './AdminProducts.css';
import RangeInput from '../../../RangeInput/RangeInput';
import Loading from '../../../Loading';

import { deepCopy, objDiff } from 'lib';

export default class AdminProducts extends Component {
  state = {
    products: null,
    values: null,
    oldValues: null,
    loading: true,
  };

  onChange = (name, value) => {
    const path = name.split('-');
    name = path.pop();

    const values = deepCopy(this.state.values);

    path.reduce((el, key) => el[key], values)[name] = +value;

    this.fixMinMax(values);

    this.setState({ values });
  };

  componentDidMount() {
    document.title = 'Окна-Плюс | Товары';
    axios
      .get(`/api/products?extended=true`)
      .then(({ data }) => this.setValues(data))
      .catch(err => {
        this.props.history.push('/admin');
      });
  }

  setValues(data) {
    data = data.map(el => {
      delete el.fields.type;
      return el;
    });
    const values = this.getValues(data);
    const oldValues = deepCopy(values);

    this.setState({ products: data, values, oldValues, loading: false });
  }

  getValues(products) {
    const values = {};

    for (let val of products) {
      const fields = val.fields;
      const product = {};
      values[val.product_key] = product;

      for (let key in fields) {
        const field = fields[key];
        const productValues = {};
        product[key] = productValues;

        if (field.type === 'range') {
          product[key] = this.getRangeValues(field);
          continue;
        }

        if (field.type === 'select' || field.type === 'select-window') {
          product[key] = this.getSelectValues(field);
          continue;
        }
      }
    }

    return values;
  }

  getRangeValues(field) {
    return {
      min: field.min,
      max: field.max,
    };
  }

  getSelectValues(field) {
    const values = field.values;
    const selectValues = {};

    for (let key in values) {
      if (values[key].price === undefined) continue;
      selectValues[key] = {};
      selectValues[key].price = values[key].price;
    }

    return {
      values: selectValues,
    };
  }

  fixMinMax = newValues => {
    const { values } = this.state;
    const changedValues = objDiff(values, newValues);

    for (let key in changedValues) {
      let product = changedValues[key];

      if (!product.width && !product.height) continue;

      if (product.width) {
        this.validateMinMax(product.width, values[key].width);
        newValues[key].width = product.width;
      }
      if (product.height) {
        this.validateMinMax(product.height, values[key].height);
        newValues[key].height = product.height;
      }
    }
  };

  validateMinMax(val, oldVal) {
    if (val.min !== undefined) {
      val.max = Math.max(val.min, oldVal.max);
      return;
    }

    if (val.max !== undefined) {
      val.min = Math.min(oldVal.min, val.max);
      return;
    }
  }

  saveValues = () => {
    const changedValues = objDiff(this.state.oldValues, this.state.values);
    if (!changedValues) return;
    this.setState({ loading: true });

    const newValues = {};
    for (let key in changedValues) {
      newValues[key] = {};
      newValues[key].fields = changedValues[key];
    }

    axios
      .put(`/api/products`, newValues)
      .then(({ data }) => {
        this.setValues(data);
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.props.history.push('/admin/login');
        } else {
          this.setState({ loading: false });
        }
      });
  };

  render() {
    return (
      <div className="products">
        <h1 className="heading">Товары</h1>

        <Loading loaded={!this.state.loading} placeholder="Загрузка...">
          <Products
            products={this.state.products}
            values={this.state.values}
            onChange={this.onChange}
          />
          <button className="btn products__save" onClick={this.saveValues}>
            Сохранить
          </button>
        </Loading>
      </div>
    );
  }
}

function Products({ products, values, onChange }) {
  return products.map(product => {
    const key = product.product_key;
    return (
      <React.Fragment key={key}>
        <section className="product">
          <h2 className="product__name subheading">{product.name}</h2>
          <ProductsGroup
            values={values[key]}
            onChange={onChange}
            product={product.fields}
            name={key}
          />
        </section>
        <hr />
      </React.Fragment>
    );
  });
}

function ProductsGroup({ product, values, onChange, name }) {
  const fields = [];

  for (let key in product) {
    fields.push(
      <div className="product-group" key={key}>
        <h3 className="product-group__name">{product[key].label}</h3>
        <div className="product-group__row">
          <ProductsInputs
            group={product[key]}
            values={values[key]}
            onChange={onChange}
            name={`${name}-${key}`}
          />
        </div>
      </div>,
    );
  }

  return fields;
}

function ProductsInputs({ group, values, onChange, name }) {
  if (group.type === 'range') {
    return [
      <ProductsRangeInput
        label="Минимальная"
        name={`${name}-min`}
        value={values.min}
        min={500}
        max={5000}
        onChange={onChange}
        key={`min-${values.min}`}
      />,
      <ProductsRangeInput
        label="Максимальная"
        name={`${name}-max`}
        value={values.max}
        min={500}
        max={5000}
        onChange={onChange}
        key={`max-${values.max}`}
      />,
    ];
  }

  if (group.type === 'select' || group.type === 'select-window') {
    const inputs = [];

    for (let key in group.values) {
      const val = group.values[key];
      if (!val.price) continue;

      inputs.push(
        <ProductsRangeInput
          key={key}
          label={val.text}
          name={`${name}-values-${key}-price`}
          onChange={onChange}
          value={values.values[key].price}
        />,
      );
    }

    return inputs;
  }

  return null;
}

function ProductsRangeInput({ label, ...rest }) {
  return (
    <label className="product-group__input">
      {label}
      <RangeInput min={1} {...rest} step="0.01" />
    </label>
  );
}
