function getDefaultValue(field) {
  switch (field.type) {
    case 'range':
      return field.min;
    case 'select':
      return Object.keys(field.values)[0];
    case 'select-window':
      return Array.from({ length: field.count }, () => ({
        openTo: Object.keys(field.values)[0],
        mosquitoNet: false,
      }));
    default:
      return null;
  }
}

function getDefaultParams(fields) {
  const values = {};

  for (let key in fields) {
    values[key] = getDefaultValue(fields[key]);
  }

  return values;
}

export default getDefaultParams;
