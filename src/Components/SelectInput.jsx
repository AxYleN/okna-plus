import React from 'react';

/**
 * Возвращает элемент select со списком опций
 * @param {{options: [{value: string, text: string}]}} props
 */
export default function SelectInput(props) {
  const { options, ...rest } = props;

  const optionsList = options.map(opt => (
    <option value={opt.value} key={opt.value}>
      {String(opt.text)}
    </option>
  ));

  return <select {...rest}>{optionsList}</select>;
}
