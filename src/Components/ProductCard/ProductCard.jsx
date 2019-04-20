import React from 'react';
import './ProductCard.css';
import BlueprintCanvas from '../ConfigurationPage/Blueprint/BlueprintCanvas';
import { deepCopy } from 'lib';

export default function ProductCard(props) {
  const { name, cost, params, count, type } = props;
  const paramsForCanvas = deepCopy(props.params);

  paramsForCanvas.height = paramsForCanvas.height.value.value;
  paramsForCanvas.width = paramsForCanvas.width.value.value;

  if (paramsForCanvas.window) {
    paramsForCanvas.window = paramsForCanvas.window.value.value;
  }

  return (
    <div className="product-card">
      <div className="product-card__info">
        <h2 className="product-card__name">{name}</h2>
        <ul className="product-card__params">
          <ParamsList params={params} />
        </ul>
        <div className="product-card__final-info">
          Стоимость: {cost} Количество: {count}
        </div>
      </div>
      <div className="product-card__image">
        <BlueprintCanvas params={paramsForCanvas} type={type} />
      </div>
    </div>
  );
}

function ParamsList({ params }) {
  const items = [];

  for (let key in params) {
    const param = params[key];

    if (!Array.isArray(param.value.value)) {
      items.push(
        <li key={key}>
          <strong>{param.name}:</strong> {param.value.text}
        </li>,
      );
      continue;
    }

    items.push(
      param.value.value.map((el, id) => {
        return (
          <li key={key + id}>
            <strong>{`${param.name} ${id + 1}`}:</strong> {el.openTo},{' '}
            {el.mosquitoNet ? 'с москитной сеткой' : 'без москитной сетки'}
          </li>
        );
      }),
    );
  }

  return items;
}
