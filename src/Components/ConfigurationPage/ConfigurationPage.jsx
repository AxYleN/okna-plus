import React, { useEffect, useState, useCallback } from 'react';
import PageLayout from '../PageLayout/PageLayout';
import ProductEdit from './../ProductEdit/ProductEdit';
import axios from 'axios';
import { getOpenToValues, getDefaultParams } from 'lib';

export default function ConfigurationPage(props) {
  const [product, setProduct] = useState(null);
  const [params, setParams] = useState(null);
  const [wasAdded, setWasAdded] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/products/${props.match.params.item}`)
      .then(({ data }) => {
        document.title = `Окна-плюс | ${data.name}`;
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

  const handleSetParams = useCallback(
    newParams => {
      setParams(newParams);
      if (wasAdded) setWasAdded(false);
    },
    [wasAdded],
  );
  const handleAdd = useCallback(() => {
    props.addToCart({ params, count: 1, key: product.product_key });
    setWasAdded(true);
  }, [params]);

  if (!product || !params) return <PageLayout>Загрузка...</PageLayout>;
  const btnClasses = wasAdded ? 'btn btn--success' : 'btn';
  return (
    <PageLayout>
      <ProductEdit params={params} product={product} setParams={handleSetParams}>
        <button className={btnClasses} onClick={handleAdd}>
          {wasAdded ? 'Добавлено' : 'Добавить в корзину'}
        </button>
      </ProductEdit>
    </PageLayout>
  );
}
