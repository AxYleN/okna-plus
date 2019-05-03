const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export default number => number.toLocaleString('ru', options);
