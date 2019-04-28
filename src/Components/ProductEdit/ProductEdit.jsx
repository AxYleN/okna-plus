import React, { useMemo } from 'react';
import './ProductEdit.css';
import Blueprint from './../ConfigurationPage/Blueprint/Blueprint';
import ProductParams from './../ProductParams/ProductParams';
import { calcPrice, calcArea } from 'lib';

export default function ProductEdit(props) {
  const { params, product, setParams, children } = props;

  const getPrice = useMemo(() => calcPrice(product.fields), [product]);

  return (
    <>
      <h1 className="heading">{product.name}</h1>
      <div className="product-edit">
        <Blueprint params={params} type={product.type} />
        <div className="product-edit__col">
          <h2 className="subheading">Параметры</h2>
          <div className="product-edit__info">
            <ProductParams fields={product.fields} params={params} setParams={setParams} />
            <div className="product-edit__price">
              <strong>Цена:</strong> {getPrice(params).toFixed(2)} рублей
            </div>
            <div className="product-edit__area">
              <strong>Площадь:</strong> {calcArea(params).toFixed(2)} м<sup>2</sup>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
