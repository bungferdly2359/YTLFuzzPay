import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from '../';
import stylesheet from './stylesheet';

export const Section = props => {
  const styles = stylesheet.styles();
  return <View style={[styles.container, props.style]}>{props.children}</View>;
};
