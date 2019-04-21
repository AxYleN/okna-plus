function compareObject(obj1, obj2) {
  if (typeof obj1 !== 'object' && typeof obj2 !== 'object') {
    return obj1 === obj2 ? undefined : obj2;
  }

  const newObj = {};
  let diffrent = false;

  for (let key in obj2) {
    let res = compareObject(obj1[key], obj2[key]);
    if (res === undefined) continue;

    newObj[key] = res;
    diffrent = true;
  }

  return diffrent ? newObj : undefined;
}

export default compareObject;