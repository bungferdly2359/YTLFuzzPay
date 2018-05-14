import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { FSApp } from '../';

let _navigator = null;

const FSNavigationProps = {
  dispatch: undefined,
  lastAction: {},
  navigator: null,
  setNavigator: navigator => {
    _navigator = navigator;
  },
  getNavigator: () => _navigator
};

const FSNavigatorContainer = props => {
  if (!_navigator) {
    return null;
  }
  FSNavigationProps.dispatch = props.dispatch;
  const { dispatch, nav } = props;
  const Navigator = _navigator;
  return <Navigator navigation={addNavigationHelpers({ dispatch, state: nav })} />;
};

const mapStateToProps = ({ nav }) => ({ nav });
const service = connect(mapStateToProps)(FSNavigatorContainer);

export { service as FSNavigationService, FSNavigationProps };
