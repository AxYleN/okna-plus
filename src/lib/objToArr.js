export default function(obj, cb = val => val) {
  const arr = [];
  for (const key in obj) {
    arr.push(cb(obj[key], key));
  }
  return arr;
}
