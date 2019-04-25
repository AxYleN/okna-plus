import React, { useCallback, useMemo } from 'react';

/**
 * Возвращает элемент select со списком опций
 * @param {{options: [{value: string, text: string}]}} props
 */
export default function SelectInput(props) {
  const { options, onChange, ...rest } = props;

  const change = useCallback(
    e => {
      const { name, value } = e.target;
      if (onChange) onChange(name, value);
    },
    [onChange],
  );

  const optionsList = useMemo(
    () =>
      options.map(opt => (
        <option value={opt.value} key={opt.value}>
          {String(opt.text)}
        </option>
      )),
    [options],
  );

  return (
    <select {...rest} onChange={change}>
      {optionsList}
    </select>
  );
}
