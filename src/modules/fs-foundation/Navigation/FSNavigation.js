import { BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { FSNavigationProps } from './';

BackHandler.addEventListener('backPress', () => {
  FSNavigationProps.dispatch(NavigationActions.back());
  return true;
});

export {};
