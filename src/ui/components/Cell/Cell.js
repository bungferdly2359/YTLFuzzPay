import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Image } from '../';
import stylesheet from './stylesheet';

export const Cell = ({ children, style, contentContainerStyle, onPress, disclosure }) => {
  const styles = stylesheet.styles();
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={[styles.container, style]}>
        <View style={[styles.contentContainer, contentContainerStyle]}>{children}</View>
        {disclosure && <Image source="icon_disclosure" style={styles.disclosure} />}
      </View>
    </TouchableHighlight>
  );
};
