import React from 'react';
import { StyleSheet } from 'react-native';
import { FSLayoutProps, FSLayoutContainer } from './';

const _layoutProps = {};
let _appDimension = {
  width: FSLayoutProps.deviceWidth,
  height: FSLayoutProps.deviceHeight
};

function getLayoutProps() {
  const { width, height } = _appDimension;
  if (!_layoutProps[width]) {
    _layoutProps[width] = {};
  }
  if (!_layoutProps[width][height]) {
    _layoutProps[width][height] = new FSLayoutProps(_appDimension);
  }
  return _layoutProps[width][height];
}

function create(stylesFn = (props: FSLayoutProps) => ({ }), compact = true) {
  const dimensionStyles = {};
  const styles = () => {
    const { width } = _appDimension;
    if (!dimensionStyles[width]) { 
      if (compact) {
        dimensionStyles[width] = StyleSheet.create(stylesFn(getLayoutProps()));
      } else {
        dimensionStyles[width] = stylesFn(getLayoutProps());
      }
    }
    return dimensionStyles[width];
  };
  return {
    styles,
    render: (renderFn = (styles => {})) => (
      <FSLayoutContainer renderContent={() => renderFn(styles())} />
    )
  };
}

function setAppDimension(appDimension) {
  if (appDimension) {
    _appDimension = appDimension;
  }
}

function getAppDimension() {
  return _appDimension;
}

const FSStyleSheet = {
  create,
  setAppDimension,
  getAppDimension
};

export default FSStyleSheet;
