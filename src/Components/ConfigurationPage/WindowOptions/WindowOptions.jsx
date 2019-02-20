import React, { Component } from 'react';

import './WindowOptions.css';
import SelectInput from '../../SelectInput';

export default class WindowOptions extends Component {
  onChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const { value: oldValue, onChange } = this.props;
    onChange({ ...oldValue, [name]: value });
  };

  mosquitoNet = () => (
    <label className="window-options__checkbox">
      Маскитная сетка:
      <input
        type="checkbox"
        name="mosquitoNet"
        value={this.props.value.mosquitoNet}
        onChange={this.onChange}
      />
    </label>
  );

  render() {
    const { value, label, options } = this.props;

    return (
      <label className="window-options">
        <span className="window-options__caption">{label}</span>
        <SelectInput
          name="openTo"
          options={options}
          value={value.openTo}
          className="settings__input window-options__select"
          onChange={this.onChange}
        />
        {value.openTo === 'no' ? null : <this.mosquitoNet />}
      </label>
    );
  }
}
