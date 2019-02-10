import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ifNotNull } from 'lib';

import Card from './Card/Card';
import './MainPage.css';
import Navbar from '../Navbar/Navbar';

function MainPage() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios.get('/api/products').then(res => {
      setProducts(res.data);
    });
  }, [true]);

  const productCards = ifNotNull(products, products =>
    products.map(p => (
      <Card
        key={p.product_key}
        img={p.image}
        text={p.name}
        to={p.product_key}
      />
    )),
  );

  return (
    <>
      <Navbar />
      <main className="main-container">{productCards}</main>
    </>
  );
}

export default MainPage;
