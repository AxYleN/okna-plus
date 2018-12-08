import React, { Component } from 'react';

import './RangeInput.css';

export default class RangeInput extends Component {
  constructor(props) {
    super(props);

    this.min = props.min || 700;
    this.max = props.max || 2400;

    this.state = {
      value: props.value || this.min,
    };
  }

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
    const { min, max } = this;
    let value = parseInt(e.target.value) || this.props.value;
    e.target.value = value < min ? min : value > max ? max : value;

    this.changeValue(e);
  };

  render() {
    const value = this.state.value;
    const { min, max } = this;

    return (
      <label className="range-input">
        {this.props.caption}
        <input
          name={this.props.name}
          type="number"
          min={min}
          max={max}
          value={value}
          onKeyPress={this.onKeyPress}
          onChange={this.onChange}
          onBlur={this.onBlur}
          className="range-input__number"
          autoComplete="off"
        />мм
        <input
          name={this.props.name}
          type="range"
          min={min}
          max={max}
          step="10"
          value={this.props.value}
          onChange={this.changeValue}
          className="range-input__slider"
        />
      </label>
    );
  }
}
