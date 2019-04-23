import React, { useEffect, useContext, useState } from 'react';
import PageLayout from '../PageLayout/PageLayout';
import ProductCard from '../ProductCard/ProductCard';

import './Cart.css';

import axios from 'axios';

import cartContext from 'lib/cartContext';
import { arrToObj as arrayToObject, calcArea, calcPrice } from 'lib';

export default function Cart() {
  const cart = useContext(cartContext);
  const [products, setProducts] = useState(null);

  const keys = [];
  cart.cart.forEach(product => {
    if (!keys.includes(product.key)) keys.push(product.key);
  });

  useEffect(() => {
    axios.get('/api/products?extended=1').then(({ data }) => {
      data.forEach(product => {
        const fields = product.fields;
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
      });

      setProducts(arrayToObject(data, el => el.product_key));
    });
  }, keys);

  let sum = 0;

  function porductCards() {
    return cart.cart.map((prod, id) => {
      const product = products[prod.key];
      const productParams = {
        name: product.name,
        count: prod.count,
        type: product.type,
        params: {},
      };
      const fields = product.fields;

      const cost = +calcPrice(fields)(prod.params).toFixed(2);

      productParams.cost = cost;
      sum += cost * productParams.count;

      for (let key in prod.params) {
        const value = prod.params[key];
        const param = {
          name: fields[key].label,
          value: {
            text:
              fields[key].values && fields[key].values[value]
                ? fields[key].values[value].text || value
                : value,
            value,
          },
        };
        productParams.params[key] = param;
      }

      const area = calcArea(prod.params);
      productParams.params.area = {
        name: 'Площадь',
        value: {
          text: area,
          value: area,
        },
      };

      return (
        <React.Fragment key={id}>
          <hr />
          <ProductCard {...productParams} />
        </React.Fragment>
      );
    });
  }

  if (cart.cart.length === 0)
    return (
      <PageLayout>
        <h1 className="heading">Корзина (пусто)</h1>
        Вы не выбрали ни одного товара.
      </PageLayout>
    );

  return (
    <PageLayout>
      <h1 className="heading">Корзина ({cart.cart.length})</h1>

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
