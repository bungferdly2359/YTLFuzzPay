import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from '../';
import stylesheet from './stylesheet';

export const Section = ({ children, style, title, action }) => {
  const styles = stylesheet.styles();
  return (
    <View style={[styles.container, style]}>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {action && <Button type="barItem done" {...action} />}
        </View>
      )}
      {children}
    </View>
  );
};
