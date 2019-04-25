import React, { useEffect, useState } from 'react';
import PageLayout from '../PageLayout/PageLayout';
import ProductEdit from './../ProductEdit/ProductEdit';
import axios from 'axios';
import { getOpenToValues, getDefaultParams } from 'lib';

export default function ConfigurationPage(props) {
  const [product, setProduct] = useState(null);
  const [params, setParams] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/products/${props.match.params.item}`)
      .then(({ data }) => {
        const { fields } = data;

        if (fields.window) {
          fields.window.values = getOpenToValues(fields.window.values);
        }

        const params = getDefaultParams(fields);

        setProduct(data);
        setParams(params);
      })
      .catch(err => {
        props.history.push('/');
      });
  }, []);

  if (!product || !params) return <PageLayout>Загрузка...</PageLayout>;
  return (
    <PageLayout>
      <ProductEdit params={params} product={product} setParams={setParams}>
        <button
          className="btn"
          onClick={() => props.addToCart({ params, count: 1, key: product.product_key })}>
          Добавить в корзину
        </button>
      </ProductEdit>
    </PageLayout>
  );
}
