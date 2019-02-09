import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ifNotNull, objToArr } from 'lib';

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

  const productCards = ifNotNull(products, products => {
    return objToArr(products).map(p => (
      <Card key={p.id} img={p.image} text={p.name} to={p.id} />
    ));
  });

  return (
    <>
      <Navbar />
      <main className="main-container">{productCards}</main>
    </>
  );
}

export default MainPage;
