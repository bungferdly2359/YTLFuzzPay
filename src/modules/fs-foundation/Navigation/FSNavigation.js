import { BackHandler } from 'react-native';
import { FSNavigationService, FSNavigationActions } from './';

function navigate(screenName, props) {
  return FSNavigationService.dispatch(FSNavigationActions.navigate(screenName, props));
}

function back(screenName, props) {
  return FSNavigationService.dispatch(FSNavigationActions.back(screenName, props));
}

function reset(screenName, props) {
  return FSNavigationService.dispatch(FSNavigationActions.reset(screenName, props));
}

BackHandler.addEventListener('backPress', () => {
  back();
  return true;
});

export default { back, reset, navigate };
