import React from 'react';
import './ProductCard.css';
import BlueprintCanvas from '../ConfigurationPage/Blueprint/BlueprintCanvas';
import RangeInput from './../RangeInput/RangeInput';

export default function ProductCard(props) {
  const { name, type, params, count, setCount, cost, area, remove, edit } = props;
  const paramsForCanvas = getValues(params);

  return (
    <div className="product-card">
      <div className="product-card__info">
        <div className="product-card__header">
          <h2 className="product-card__name">{name}</h2>
          {edit ? (
            <button className="product-card__button" onClick={edit}>
              Изменить
            </button>
          ) : null}
          {remove ? (
            <button className="product-card__button" onClick={remove}>
              Удалить
            </button>
          ) : null}
        </div>
        <ul className="product-card__params">
          <ParamsList params={params} />
          <li>
            <strong>Площадь:</strong> {area} м<sup>2</sup>
          </li>
        </ul>
        <div className="product-card__final-info">
          <span>
            <strong>Стоимость:</strong> {cost.toFixed(2)} руб.
          </span>
          <span className="final-info__count">
            <strong>Количество:</strong>{' '}
            {!setCount ? (
              count
            ) : (
              <RangeInput onChange={(k, v) => setCount(+v)} value={count} min="1" max="10" />
            )}
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
