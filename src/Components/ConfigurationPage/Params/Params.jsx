import React from 'react';

import './Params.css';
import SelectInput from '../../SelectInput';
import RangeInput from '../../RangeInput/RangeInput';
import WindowOptions from '../WindowOptions/WindowOptions';
import { objToArr } from 'lib';

export default function Params(props) {
  const inputs = generateInputs(props);

  const { area, price } = props;

  return (
    <div className="settings">
      <h2>Параметры</h2>
      {inputs}
      <div className="settings__info">
        <p>
          <strong>Площадь:</strong> {area.toFixed(2)} м<sup>2</sup>
        </p>
        <p>
          <strong>Цена:</strong> {price.toFixed(2)}р.
        </p>
        <button className="settings__add-to-chart">Добавить в корзину</button>
      </div>
    </div>
  );
}

function generateInputs(props) {
  const { onChange, onWindowChange, params, fields } = props;

  const inputs = [];

  for (let key in fields) {
    const field = fields[key];
    const type = field.type;

    const props = {
      key,
      field,
      value: params[key],
    };

    if (type === 'range') {
      inputs.push(getRangeInput(props, onChange));
    } else if (type === 'select' && key === 'window') {
      inputs.push(...getWindowInputs(props, onWindowChange));
    } else if (type === 'select') {
      inputs.push(getSelectInput(props, onChange));
    }
  }

  return inputs;
}

function getRangeInput(props, onChange) {
  const { key, field, value } = props;

  const _props = {
    name: key,
    min: field.min,
    max: field.max,
    value,
    onChange,
  };

  return (
    <label key={key}>
      {field.label}:
      <RangeInput {..._props} />
      мм
    </label>
  );
}

function getOptionsArray(values) {
  return objToArr(values, (val, key) => ({
    value: key,
    text: val.text,
  }));
}

function getSelectInput(props, onChange) {
  const { key, field, value } = props;

  const _props = {
    name: key,
    options: getOptionsArray(field.values),
    value,
    onChange,
  };

  return (
    <label key={key}>
      {field.label}
      <SelectInput {..._props} className="settings__input" />
    </label>
  );
}

function getWindowInputs(props, onChange) {
  const { key, field, value } = props;

  const options = getOptionsArray(field.values);
  const inputs = [];

  for (let i = 0; i < field.count; i++) {
    const _props = {
      key: `${key}_${i}`,
      label: `${field.label} ${i + 1}`,
      options,
      value: value[i],
      onChange: window => onChange(window, i),
    };

    inputs.push(<WindowOptions {..._props} />);
  }

  return inputs;
}
