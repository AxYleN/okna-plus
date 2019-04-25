import React, { Component } from 'react';

import './RangeInput.css';

export default class RangeInput extends Component {
  constructor(props) {
    super(props);

    let value = props.value;
    if (value === undefined) value = props.min || 0;

    this.state = { value };
  }

  changeValue = e => {
    this.onChange(e);

    const { name, value } = e.target;
    this.props.onChange(name, value);
  };

  onChange = e => {
    const value = e.target.value;
    this.setState({ value });
  };

  onKeyPress = e => {
    const key = e.key;
    if (key === 'Enter') e.target.blur();
    else if (isNaN(key)) e.preventDefault();
  };

  onBlur = e => {
    const { min, max } = this.props;
    let value = parseInt(e.target.value);
    value = isNaN(value) ? this.props.value : value;
    e.target.value = value <= min ? min : value >= max ? max : value;

    this.changeValue(e);
  };

  render() {
    return (
      <input
        type="number"
        autoComplete="off"
        className="range-input"
        {...this.props}
        value={this.state.value}
        onKeyPress={this.onKeyPress}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    );
  }
}
