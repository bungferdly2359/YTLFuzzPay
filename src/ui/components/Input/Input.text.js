import React from 'react';
import { TextInput } from 'react-native';
import stylesheet from './stylesheet';

export default ({ value, inputStyle, ...otherProps }) => {
  const styles = stylesheet.styles();

  return <TextInput style={[styles.detailText, inputStyle]} autoCorrect={false} defaultValue={value} maxLength={200} {...otherProps} />;
};
