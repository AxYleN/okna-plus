import React from 'react';

import './WindowOptions.css';

export default function WindowOptions(props) {
  const value = props.value;

  const onChange = function(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    props.onChange({ ...props.value, [name]: value });
  };

  const mosquitoNet = (
    <label className="window-options__checkbox">
      Маскитная сетка:
      <input type="checkbox" name="mosquitoNet" checked={value.mosquitoNet} onChange={onChange} />
    </label>
  );

  return (
    <label className="window-options">
      <span className="window-options__caption">{props.caption}</span>
      <select
        name="openTo"
        value={value.openTo}
        className="settings__input window-options__select"
        onChange={onChange}>
        <option value="no">Глухое</option>
        <option value="toLeft">Открывается влево</option>
        <option value="toRight">Открывается вправо</option>
      </select>
      {value.openTo === 'no' ? '' : mosquitoNet}
    </label>
  );
}
