import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

import PageLayout from '../PageLayout/PageLayout';
import CartProductsList from './CartProductsList';
import CartModalEdit from './CartModalEdit';
import CartModalOrder from './CartModalOrder';
import Modal from './../Modal/Modal';

import cartContext from 'lib/cartContext';
import { getOpenToValues, arrToObj, calcPrice, formatNumber } from 'lib';

export default function Cart({ removeProduct, changeAtId, clearCart }) {
  const { cart } = useContext(cartContext);
  const [products, setProducts] = useState();
  const [editId, setEditId] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderInfoModal, setOrderInfoModal] = useState(null);

  useEffect(() => {
    setEditId(null);
  }, [cart]);

  useEffect(() => {
    document.title = 'Окна-плюс | Корзина';
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

  function handleOrder(client) {
    axios.post('/api/orders', { client, products: cart }).then(({ data }) => {
      setShowOrderModal(false);
      clearCart();
      setOrderInfoModal(<OrderInfoModal data={data} onClose={() => setOrderInfoModal(null)} />);
    });
  }

  // РЕНДЕР
  if (cart.length === 0) {
    return (
      <PageLayout>
        <h1 className="heading">Корзина (пусто)</h1>
        Вы не выбрали ни одного товара.
        {orderInfoModal}
      </PageLayout>
    );
  }

  if (!products) {
    return (
      <PageLayout>
        <h1 className="heading">Корзина ({cart.length})</h1>
        Загрузка...
        {orderInfoModal}
      </PageLayout>
    );
  }

  const price = getPrice(cart, products).toFixed(2);
  return (
    <PageLayout>
      <h1 className="heading">Корзина ({cart.length})</h1>

      <hr className="cart-hr" />
      <CartProductsList
        cart={cart}
        products={products}
        onEdit={setEditId}
        onRemove={removeProduct}
        change={changeAtId}
      />
      <div className="cart-footer">
        <div className="cart-footer__cost">
          <strong>Итого:</strong> {formatNumber(+price)} руб.
        </div>
        <button className="btn" onClick={() => setShowOrderModal(true)}>
          Оформить заказ
        </button>
      </div>
      <CartModalEdit
        cart={cart}
        products={products}
        editId={editId}
        onClose={() => setEditId(null)}
        onSave={changeAtId}
      />
      {showOrderModal ? (
        <CartModalOrder
          price={price}
          onClose={() => setShowOrderModal(false)}
          onOrder={handleOrder}
        />
      ) : null}
      {orderInfoModal}
    </PageLayout>
  );
}

function OrderInfoModal({ data, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="cart-modal-order-info">
        <h2 className="heading">Заказ оформлен</h2>
        <div className="cart-modal-order-info__info">
          <div>
            Номер заказа: <strong>{data.orderId}</strong>
          </div>
          <div>
            Стоимость: <strong>{formatNumber(data.price)}</strong> руб.
          </div>
        </div>
        <button onClick={onClose} className="btn">
          Закрыть
        </button>
      </div>
    </Modal>
  );
}

function getPrice(cart, products) {
  return cart.reduce(
    (acc, product) =>
      acc + calcPrice(products[product.key].fields)(product.params).toFixed(2) * product.count,
    0,
  );
}
