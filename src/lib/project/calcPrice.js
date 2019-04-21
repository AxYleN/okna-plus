import calcArea from './calcArea';

function getPriceList(fields) {
  const prices = {};

  for (let key in fields) {
    const field = fields[key];
    if (field.type === 'range') continue;

    const values = {};
    prices[key] = values;

    for (let key in field.values) {
      values[key] = field.values[key].price || 0;
    }
  }

  return prices;
}

function getCurrentPrices(fields, params) {
  const prices = getPriceList(fields);
  const cPrices = {};

  for (let key in params) {
    let price = prices[key];
    if (!price) continue;

    if (!Array.isArray(params[key])) {
      cPrices[key] = price[params[key]];
      continue;
    }

    cPrices[key] = params[key].reduce((acc, window) => {
      let val = price[window.openTo];

      if (window.mosquitoNet) {
        val += fields.window.mosquitoNet;
      }

      return acc + val;
    }, 0);
  }

  return cPrices;
}

function getPrice(fields, params) {
  const prices = getCurrentPrices(fields, params);

  const area = calcArea(params);
  const costPerSqrM = prices.profile + prices.glass;
  delete prices.profile;
  delete prices.glass;

  let price = costPerSqrM * area;

  for (let key in prices) {
    price += prices[key];
  }

  return price;
}

export default function(fields) {
  return params => getPrice(fields, params);
}
