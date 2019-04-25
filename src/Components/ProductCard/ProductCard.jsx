import React from 'react';
import './ProductCard.css';
import BlueprintCanvas from '../ConfigurationPage/Blueprint/BlueprintCanvas';

export default function ProductCard(props) {
  const { name, type, params, count, cost, area, remove, edit } = props;
  const paramsForCanvas = getValues(params);

  return (
    <div className="product-card">
      <div className="product-card__info">
        <div className="product-card__header">
          <h2 className="product-card__name">{name}</h2>
          <button className="product-card__button" onClick={edit}>Изменить</button>
          <button className="product-card__button" onClick={remove}>Удалить</button>
        </div>
        <ul className="product-card__params">
          <ParamsList params={params} />
          <li>
            <strong>Площадь:</strong> {area} м<sup>2</sup>
          </li>
        </ul>
        <div className="product-card__final-info">
          <span>
            <strong>Стоимость:</strong> {cost} руб.
          </span>
          <span className="final-info__count">
            <strong>Количество:</strong> {count}
          </span>
        </div>
      </div>
      <div className="product-card__image">
        <BlueprintCanvas params={paramsForCanvas} type={type} resolution="600" />
      </div>
    </div>
  );
}

function getValues(params) {
  const values = {};

  for (let key in params) {
    values[key] = params[key].value.value;
  }

  return values;
}

function ParamsList({ params }) {
  const items = [];

  for (let key in params) {
    const { name, value } = params[key];

    if (!Array.isArray(value.text)) {
      items.push(
        <li key={key}>
          <strong>{name}:</strong> {value.text}
        </li>,
      );
      continue;
    }

    items.push(
      value.text.map((text, id) => {
        return (
          <li key={key + id}>
            <strong>{`${name} ${id + 1}`}:</strong> {text}
          </li>
        );
      }),
    );
  }

  return items;
}
