import React, { useEffect, useContext, useState } from 'react';
import PageLayout from '../PageLayout/PageLayout';
import ProductCard from '../ProductCard/ProductCard';

import './Cart.css';

import axios from 'axios';

import cartContext from 'lib/cartContext';
import {
  arrToObj as arrayToObject,
  calcArea,
  calcPrice,
  deepCopy,
  getOpenToValues,
  getOpenToText,
} from 'lib';

export default function Cart() {
  const { cart } = useContext(cartContext);
  const [products, setProducts] = useState(null);

  const keys = [];
  cart.forEach(product => {
    if (!keys.includes(product.key)) keys.push(product.key);
  });

  useEffect(() => {
    axios.get('/api/products?extended=1').then(({ data }) => {
      data.forEach(product => {
        const fields = product.fields;
        if (fields.window) {
          fields.window.values = getOpenToValues(fields.window.values);
        }
      });

      setProducts(arrayToObject(data, el => el.product_key));
    });
  }, keys);

  let sum = 0;

  function porductCards() {
    return cart.map((currentProduct, id) => {
      const { params, count } = currentProduct;
      const product = products[currentProduct.key];

      const fields = product.fields;
      const cost = +calcPrice(fields)(params).toFixed(2);
      sum += cost * count;

      const productParams = {
        name: product.name,
        type: product.type,
        area: calcArea(params),
        params: {},
        count,
        cost,
      };

      for (let key in params) {
        productParams.params[key] = formatParam(params[key], fields[key]);
      }

      return (
        <React.Fragment key={id}>
          <hr />
          <ProductCard {...productParams} />
        </React.Fragment>
      );
    });
  }

  if (cart.length === 0)
    return (
      <PageLayout>
        <h1 className="heading">Корзина (пусто)</h1>
        Вы не выбрали ни одного товара.
      </PageLayout>
    );

  return (
    <PageLayout>
      <h1 className="heading">Корзина ({cart.length})</h1>

      {products ? porductCards() : 'Загрузка...'}
      <hr />
      <div className="cart-footer">
        <div className="cart-footer__cost">
          <strong>Итого:</strong> {sum} руб.
        </div>
        <button className="btn">Оформить заказ</button>
      </div>
    </PageLayout>
  );
}

function formatParam(value, field) {
  const newParam = { name: field.label };

  if (field.type === 'range') {
    newParam.value = { text: value, value };
  } else if (field.type === 'select') {
    newParam.value = { text: field.values[value].text, value };
  } else if (field.type === 'select-window') {
    newParam.value = {
      text: value.map(({ openTo, mosquitoNet }) => {
        let text = getOpenToText(openTo);
        if (mosquitoNet) text += ', москитная сетка';

        return text;
      }),
      value: deepCopy(value),
    };
  }

  return newParam;
}
