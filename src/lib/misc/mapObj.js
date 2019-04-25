export default (object, cb) => {
  const mappedObject = {};

  for (let key in object) {
    mappedObject[key] = cb(object[key], key);
  }

  return mappedObject;
};
