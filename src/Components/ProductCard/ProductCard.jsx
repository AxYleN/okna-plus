import React from 'react';
import './ProductCard.css';
import BlueprintCanvas from '../ConfigurationPage/Blueprint/BlueprintCanvas';

export default function ProductCard(props) {
  const { name, params, cost, count, type, labels } = props;

  return (
    <div className="product-card">
      <div className="product-card__info">
        <h2 className="product-card__name">{name}</h2>
        <ul className="product-card__params">
          <ParamsList params={params} labels={labels} />
        </ul>
        <div className="product-card__final-info">
          Стоимость: {cost} Количество: {count}
        </div>
      </div>
      <div className="product-card__image">
        <BlueprintCanvas params={params} type={type} />
      </div>
    </div>
  );
}

function ParamsList({ params, labels }) {
  const items = [];

  for (let key in params) {
    const param = params[key];

    if (!Array.isArray(param)) {
      items.push(
        <li key={key}>
          <strong>{labels[key]}:</strong> {param}
        </li>,
      );
      continue;
    }

    items.push(
      param.map((el, id) => {
        return (
          <li key={key}>
            <strong>{`${labels[key].label} ${id + 1}`}:</strong> {labels[key][el.openTo]}, {el.mosquitoNet ? 'с москитной сеткой' : 'без москитной сетки'}
          </li>
        );
      }),
    );
  }

  return items;
}
