import { NavigationActions } from 'react-navigation';
import { FSNavigationProps } from './';
import { FSApp } from '../';

const initialState = () => (FSNavigationProps.getNavigator() ? FSNavigationProps.getNavigator().router.getStateForAction(NavigationActions.init()) : {});

const reducer = (state = initialState(), action) => {
  const nextState = FSNavigationProps.getNavigator() ? FSNavigationProps.getNavigator().router.getStateForAction(action, state) : state;
  if (nextState !== state) {
    FSNavigationProps.lastAction = action;
  }
  return nextState || state;
};

export { reducer as FSNavigationReducer };
