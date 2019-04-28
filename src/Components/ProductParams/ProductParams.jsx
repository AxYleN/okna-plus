import React from 'react';
import RangeInput from './../RangeInput/RangeInput';
import SelectInput from './../SelectInput';
import WindowOptions from '../ConfigurationPage/WindowOptions/WindowOptions';
import { mapObj, objToArr } from 'lib';
import './ProductParams.css';

export default function ProductParams(props) {
  const { params, setParams, fields } = props;

  const onChange = (key, value) => {
    const keys = key.split('__');
    const newParams = { ...params };

    if (keys.length === 1) {
      newParams[key] = value;
      setParams(newParams);
      return;
    }

    const id = keys.pop();
    key = keys[0];

    newParams[key] = [...newParams[key]];
    newParams[key][id] = value;
    setParams(newParams);
  };

  return <div className="product-params">{getFields(fields, params, onChange)}</div>;
}

function getFields(fields, params, onChange) {
  const mappedFields = mapObj(fields, (field, key) => {
    return getField(field, key, params[key], onChange);
  });

  return objToArr(mappedFields);
}

function getField(field, key, value, onChange) {
  const props = { field, key, value, onChange };

  switch (field.type) {
    case 'range':
      return getRangeInput(props);
    case 'select':
      return getSelectInput(props);
    case 'select-window':
      return getSelectWindowInput(props);
    default:
      break;
  }
}

function getRangeInput({ field, key, value, onChange }) {
  const props = {
    name: key,
    min: field.min,
    max: field.max,
    value,
    onChange: (key, val) => onChange(key, +val),
  };

  return (
    <label key={key}>
      <strong>{field.label}:</strong>
      <RangeInput {...props} />
      мм
    </label>
  );
}

function getSelectInput({ field, key, value, onChange }) {
  const props = {
    name: key,
    options: getOptionsArray(field.values),
    value,
    onChange,
  };

  return (
    <label key={key} className="product-params__select">
      <strong>{field.label}</strong>
      <SelectInput {...props} />
    </label>
  );
}

function getSelectWindowInput({ field, key, value, onChange }) {
  const options = getOptionsArray(field.values);
  const inputs = [];

  for (let i = 0; i < field.count; i++) {
    const name = `${key}__${i}`;
    const props = {
      key: name,
      label: `${field.label} ${i + 1}`,
      options,
      value: value[i],
      onChange,
      name,
    };

    inputs.push(<WindowOptions {...props} />);
  }

  return inputs;
}

function getOptionsArray(values) {
  return objToArr(values, (val, key) => ({
    value: key,
    text: val.text,
  }));
}
