import React, { useEffect, useContext, useState } from 'react';
import PageLayout from '../PageLayout/PageLayout';
import ProductCard from '../ProductCard/ProductCard';

import './Cart.css';

import axios from 'axios';

import cartContext from '../../cartContext';
import arrayToObject from '../../lib/arrToObj';

export default function Cart(props) {
  const cart = useContext(cartContext);
  const [products, setProducts] = useState(null);

  const keys = [];
  cart.cart.forEach(product => {
    if (!keys.includes(product.key)) keys.push(product.key);
  });

  useEffect(() => {
    axios.get('/api/products?extended=1').then(({ data }) => {
      setProducts(arrayToObject(data, el => el.product_key));
    });
  }, keys);

  function porductCards() {
    return cart.cart.map((prod, id) => {
      const product = products[prod.key];
      const productParams = {
        name: product.name,
        count: prod.count,
        cost: 1000,
        type: product.fields.type,
        params: {},
      };
      const fields = product.fields;

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

      console.log(prod, product, productParams);

      return (
        <React.Fragment key={id}>
          <hr />
          <ProductCard {...productParams} />
        </React.Fragment>
      );
    });
  }

  return (
    <PageLayout>
      <h1 className="heading">Корзина ({cart.cart.length})</h1>

      {products ? porductCards() : 'Загрузка...'}
      <hr />
      <div className="cart-footer">
        <div className="cart-footer__cost">
          <strong>Итого:</strong> 13400 руб.
        </div>
        <button className="btn">Оформить заказ</button>
      </div>
    </PageLayout>
  );
}
