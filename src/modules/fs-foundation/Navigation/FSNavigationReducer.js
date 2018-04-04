import { NavigationActions } from 'react-navigation';
import { FSNavigationService } from './';
import { FSApp } from '../';

const initialState = () => (
  FSNavigationService.getNavigator() ? FSNavigationService.getNavigator().router.getStateForAction(NavigationActions.init()) : {}
);

const reducer = (state = initialState(), action) => {
  const nextState = FSNavigationService.getNavigator() ? FSNavigationService.getNavigator().router.getStateForAction(action, state) : state;
  if (nextState !== state) {
    FSNavigationService.lastAction = action;
  }
  return nextState || state;
};

FSApp.addReducer('nav', reducer);
export default reducer;
