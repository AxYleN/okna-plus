import React, { Component } from 'react';

import './WindowOptions.css';
import SelectInput from '../../SelectInput';

export default class WindowOptions extends Component {
  onChange = (name, value) => {
    const { value: oldValue, onChange } = this.props;
    const newValue = { ...oldValue, [name]: value };

    if (value === 'no') {
      newValue.mosquitoNet = false;
    }

    onChange(this.props.name, newValue);
  };

  mosquitoNet = () => (
    <label className="window-options__checkbox">
      Москитная сетка:
      <input
        type="checkbox"
        name="mosquitoNet"
        checked={this.props.value.mosquitoNet}
        onChange={({ target }) => {
          const { name, checked } = target;
          this.onChange(name, checked);
        }}
      />
    </label>
  );

  render() {
    const { value, label, options } = this.props;

    return (
      <label className="window-options">
        <span className="window-options__caption">
          <strong>{label}</strong>
        </span>
        <SelectInput
          name="openTo"
          options={options}
          value={value.openTo}
          className="window-options__select"
          onChange={this.onChange}
        />
        {value.openTo === 'no' ? null : <this.mosquitoNet />}
      </label>
    );
  }
}
