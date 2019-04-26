import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

import PageLayout from '../PageLayout/PageLayout';
import CartProductsList from './CartProductsList';
import CartModalEdit from './CartModalEdit';

import cartContext from 'lib/cartContext';
import { getOpenToValues, arrToObj, calcPrice } from 'lib';

export default function Cart({ removeProduct, changeAtId }) {
  const { cart } = useContext(cartContext);
  const [products, setProducts] = useState();
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    setEditId(null);
  }, [cart]);

  useEffect(() => {
    axios.get('/api/products?extended=1').then(({ data }) => {
      data.forEach(product => {
        const fields = product.fields;
        if (fields.window) {
          fields.window.values = getOpenToValues(fields.window.values);
        }
      });

      setProducts(arrToObj(data, el => el.product_key));
    });
  }, []);

  // РЕНДЕР
  if (cart.length === 0) {
    return (
      <PageLayout>
        <h1 className="heading">Корзина (пусто)</h1>
        Вы не выбрали ни одного товара.
      </PageLayout>
    );
  }

  if (!products) {
    return (
      <PageLayout>
        <h1 className="heading">Корзина ({cart.length})</h1>
        Загрузка...
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <h1 className="heading">Корзина ({cart.length})</h1>

      <hr className="cart-hr" />
      <CartProductsList
        cart={cart}
        products={products}
        onEdit={setEditId}
        onRemove={removeProduct}
      />
      <div className="cart-footer">
        <div className="cart-footer__cost">
          <strong>Итого:</strong> {getPrice(cart, products).toFixed(2)} руб.
        </div>
        <button className="btn">Оформить заказ</button>
      </div>
      <CartModalEdit
        cart={cart}
        products={products}
        editId={editId}
        onClose={() => setEditId(null)}
        onSave={changeAtId}
      />
    </PageLayout>
  );
}

function getPrice(cart, products) {
  return cart.reduce(
    (acc, product) =>
      acc + calcPrice(products[product.key].fields)(product.params).toFixed(2) * product.count,
    0,
  );
}
