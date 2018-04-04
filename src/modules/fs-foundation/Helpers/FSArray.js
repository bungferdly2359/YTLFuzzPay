const FSArray = {

  findMap: (arr, map) => {
    let result = null;
    arr.some(s => {
      result = map(s);
      return result;
    });
    return result;
  },
  
  mapOrAdd: (arr, some, map) => {
    let result = null;
    if (arr.some(some)) {
      result = arr.map(m => (some(m) ? map(m) : m));
    } else {
      result = [...arr, map({})];
    }
    return result;
  },

  equal: (x, y, key) => (
    x && y && x.length === y.length && x.every((xi, i) => FSArray.equalSingle(xi, y[i], key))
  ),
  
  equalSingle: (x, y, key) => (
    key != null ? x[key] === y[key] : x === y
  ),

  toggle: (arr = [], x, key) => {
    if (x == null) { 
      return arr; 
    }
    if (arr.some(a => FSArray.equalSingle(a, x, key))) {
      return arr.filter(a => !FSArray.equalSingle(a, x, key));
    }
    return [...arr, x];
  },

  toggleMany: (arr = [], xs = [], key) => {
    const arrWithoutXS = arr.filter(a => xs.every(x => !FSArray.equalSingle(a, x, key)));
    if (xs.every(x => arr.some(a => FSArray.equalSingle(a, x, key)))) {
      return arrWithoutXS;
    } 
    return [...arrWithoutXS, ...xs];
  },

  move: (arr = [], x, i) => {
    const s = [...arr];
    s.splice(i, 0, s.splice(s.indexOf(x), 1)[0]);
    return s;
  },

  toObject: (arr, key = 'key') => {
    const ret = {};
    arr.forEach(a => {
      const { [key]: k, ...omit } = a;
      ret[k] = omit;
    });
    return ret;
  }
};

export default FSArray;
