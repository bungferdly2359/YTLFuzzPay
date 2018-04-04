import { FSLayoutActions, FSLayoutProps } from './';
import { FSApp } from '../';

const initialState = () => ({
  appDimension: {
    width: FSLayoutProps.deviceWidth,
    height: FSLayoutProps.deviceHeight
  }
});

function reducer(state = initialState(), action) {
  const { type, payload } = action;
  switch (type) {
    case FSLayoutActions.types.SET_APP_DIMENSION:
      return { ...state, appDimension: payload };
    default:
      return state;
  }
}

FSApp.addReducer('layout', reducer);
export default reducer;
