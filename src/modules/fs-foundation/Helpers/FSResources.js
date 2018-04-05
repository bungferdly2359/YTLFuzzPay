let _resources = {};
let _baseURLFunction = null;

export default {
  setResources: resources => (_resources = resources),
  setBaseURLFunction: baseURLFunction => (_baseURLFunction = baseURLFunction),
  getResource: resourceName => {
    if (!resourceName) {
      return null;
    }
    if (resourceName.uri) {
      return resourceName;
    }
    if (typeof resourceName === 'string') {
      if (resourceName.startsWith('/') && _baseURLFunction) {
        return { uri: `${_baseURLFunction()}${resourceName}` };
      } else if (resourceName.startsWith('http') || resourceName.startsWith('file:') || resourceName.startsWith('/')) {
        return { uri: resourceName };
      }
      const res = _resources[resourceName];
      if (res) {
        return res;
      }
    }
    return null;
  }
};
