import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { calcPrice, calcArea, getOpenToText, deepCopy } from 'lib';

export default function CartProductsList({ cart, products, onEdit, onRemove, change }) {
  const productsList = cart.map((currentProduct, id) => {
    const { params, count } = currentProduct;
    const product = products[currentProduct.key];

    const fields = product.fields;
    const cost = +calcPrice(fields)(params).toFixed(2);

    const productParams = {
      name: product.name,
      type: product.type,
      area: calcArea(params).toFixed(2),
      params: {},
      count,
      cost,
    };

    for (let key in params) {
      productParams.params[key] = formatParam(params[key], fields[key]);
    }

    return (
      <React.Fragment key={id}>
        <ProductCard
          {...productParams}
          remove={() => onRemove(id)}
          edit={() => onEdit(id)}
          setCount={count => change({ count }, id)}
        />
        <hr />
      </React.Fragment>
    );
  });

  return <>{productsList}</>;
}

function formatParam(value, field) {
  const newParam = { name: field.label };

  if (field.type === 'range') {
    newParam.value = { text: value, value };
  } else if (field.type === 'select') {
    newParam.value = { text: field.values[value].text, value };
  } else if (field.type === 'select-window') {
    newParam.value = {
      text: value.map(({ openTo, mosquitoNet }) => {
        let text = getOpenToText(openTo);
        if (mosquitoNet) text += ', москитная сетка';

        return text;
      }),
      value: deepCopy(value),
    };
  }

  return newParam;
}
