import React from 'react';
import MaskedInput from 'react-text-mask';

const phoneMask = [
  '+',
  '7',
  ' ',
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

export default function PhoneInput({ placeholder, ...props }) {
  return (
    <MaskedInput
      mask={phoneMask}
      placeholder={placeholder}
      onFocus={e => (e.target.placeholder = '+7 (___) ___-__-__')}
      onBlur={e => (e.target.placeholder = placeholder)}
      type="tel"
      pattern="\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}"
      keepCharPositions={true}
      {...props}
    />
  );
}
