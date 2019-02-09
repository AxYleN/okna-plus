export default function(obj, keyName = 'id') {
  const arr = [];
  let currentObj = null;
  for (const key in obj) {
    currentObj = obj[key];
    currentObj[keyName] = key;
    arr.push(currentObj);
  }
  return arr;
}
