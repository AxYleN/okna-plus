export default function(obj, cb) {
  return obj ? cb(obj) : null;
}
