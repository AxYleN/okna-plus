import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ifNotNull } from 'lib';

import Card from './Card/Card';
import './MainPage.css';
import PageLayout from '../PageLayout/PageLayout';

function MainPage() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    document.title = 'Окна-Плюс';
    axios.get('/api/products').then(res => {
      setProducts(res.data);
    });
  }, []);

  const productCards = ifNotNull(products, products =>
    products.map(p => <Card key={p.product_key} img={p.image} text={p.name} to={p.product_key} />),
  );

  return (
    <PageLayout backLink={null}>
      <ul className="main-container">{productCards}</ul>
    </PageLayout>
  );
}

export default MainPage;
