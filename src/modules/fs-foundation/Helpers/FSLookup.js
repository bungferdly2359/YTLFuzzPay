
function FSLookup(object, path = '', type = 'object', nullable = false) {
  const paths = path.split(/[\s.[\]]+/).filter(p => p.length > 0);
  let i = 0;
  let obj = object;
  while (obj != null && paths.length > i) {
    const prop = paths[i];
    const arrayIndex = parseInt(prop, 10);
    if (isNaN(arrayIndex)) {
      if (prop === 'last()' && Array.isArray(obj) && obj.length > 0) {
        obj = obj[obj.length - 1];
      } else {
        obj = obj[prop];
      }
    } else {
      obj = obj[arrayIndex];
    }
    i++;
  }
  if (type === 'object') {
    obj = typeof obj === 'object' && !Array.isArray(obj) ? obj : null;
  } else if (type === 'array') {
    obj = typeof obj === 'object' && Array.isArray(obj) ? obj : null;
  } else if (typeof obj !== type) {
    obj = null;
  }
  if (obj == null && !nullable) {
    if (type === 'object') return {};
    else if (type === 'array') return [];
    else if (type === 'string') return '';
    else if (type === 'number') return 0;
    else if (type === 'boolean') return false;
  }
  if (obj != null && nullable) {
    if (type === 'object' && Object.keys(obj).length === 0) return null;
    else if (type === 'array' && obj.length === 0) return null;
    else if (type === 'string' && obj.length === 0) return null;
  }
  return obj;
}

export default FSLookup;
