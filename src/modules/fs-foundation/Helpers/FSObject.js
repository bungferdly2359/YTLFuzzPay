const FSObject = {
  toArray: (obj) => Object.keys(obj).map(k => ({ key: k, ...obj[k] }))
};
  
export default FSObject;
