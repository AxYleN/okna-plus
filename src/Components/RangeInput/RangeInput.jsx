import React, { Component } from 'react';

import './RangeInput.css';

export default class RangeInput extends Component {
  state = {
    value: this.props.value || this.props.min,
  };

  changeValue = e => {
    this.onChange(e);
    this.props.onChange(e);
  };

  onChange = e => {
    const value = parseInt(e.target.value);
    this.setState({ value });
  };

  onKeyPress = e => {
    const key = e.key;
    if (key === 'Enter') e.target.blur();
    else if (isNaN(key)) e.preventDefault();
  };

  onBlur = e => {
    const { min, max } = this.props;
    let value = parseInt(e.target.value) || this.props.value;
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
