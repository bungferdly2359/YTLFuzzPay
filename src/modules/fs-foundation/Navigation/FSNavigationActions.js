import { NavigationActions } from 'react-navigation';
import { FSNavigationService } from './';

const routeTypes = {
  POPUP: 0,
  MODAL: 1,
  MAIN: 2
};

const getCurrentRouteType = () => (dispatch, getState) => {
  let nav = getState().nav;
  let i = 0;
  while (nav.index === 0 && nav.routes && i < 2) {
    nav = nav.routes[nav.index];
    i++;
  }
  return i;
};

const navigateAction = (screenName, props) => NavigationActions.navigate({ routeName: screenName, params: props });

const navigate = (screenName, props) => (dispatch) => {
  // const routes = FSNavigationService.getRoutes();
  // if (!routes) {
    dispatch(navigateAction(screenName, props));
    return;
  // }
  // const route = [screenName];
  // switch (route.level) {
  //   case 'modal':
  //     dispatch(modal(screenName, props));
  //     break;
  //   case 'popup':
  //     dispatch(popup(screenName, props));
  //     break;
  //   default :
  //     dispatch(push(screenName, props));
  //     break;
  // }
};

const push = (screenName, props) => (dispatch) => {
  if (dispatch(getCurrentRouteType()) === routeTypes.POPUP) {
    dispatch(back());
    setTimeout(() => dispatch(push(screenName, props)), 300);
    return;
  }
  dispatch(navigateAction(screenName, props));
};

const modal = (screenName, props) => (dispatch) => {
  if (dispatch(getCurrentRouteType()) !== routeTypes.MAIN) {
    dispatch(back());
    setTimeout(() => dispatch(modal(screenName, props)), 350);
    return;
  }
  dispatch(navigateAction(screenName, props));
};

const popup = (screenName, props) => (dispatch) => {
  dispatch(navigateAction(screenName, props)); 
};

const back = (screenName, props = {}) => (dispatch) => {
  dispatch({ ...NavigationActions.back(), ...props });
};

const reset = (screenName, props) => (dispatch) => {
  // if (dispatch(getCurrentRouteType()) !== routeTypes.MAIN) {
  //   dispatch(back(null, { duration: 0 }));
  //   setTimeout(() => dispatch(reset(screenName, props)), 0);
  //   return;
  // }
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [navigateAction(screenName, props)],
  });
  dispatch({ ...resetAction, duration: 0 });
};

export default { back, reset, navigate };
