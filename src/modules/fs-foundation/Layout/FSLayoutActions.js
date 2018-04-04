const types = {
  SET_APP_DIMENSION: 'FSLayout::setAppDimension'
};

const setAppDimension = (appDimension = { width: 0, height: 0 }) => ({
  type: types.SET_APP_DIMENSION,
  payload: appDimension
});

export default {
  types,
  setAppDimension
};
