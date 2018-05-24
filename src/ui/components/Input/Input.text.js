import React from 'react';
import { TextInput } from 'react-native';
import stylesheet from './stylesheet';

export default ({ value, inputStyle, keyboardType = 'default', onChangeText, editable = true, onEndEditing, onBlur, onFocus, returnKeyType, placeholder, secureTextEntry }) => {
  const styles = stylesheet.styles();

  return (
    <TextInput
      editable={editable}
      style={[styles.detailText, inputStyle]}
      autoCorrect={false}
      defaultValue={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      onBlur={onBlur}
      onFocus={onFocus}
      keyboardType={keyboardType}
      onEndEditing={onEndEditing}
      returnKeyType={returnKeyType}
      secureTextEntry={secureTextEntry}
    />
  );
};
