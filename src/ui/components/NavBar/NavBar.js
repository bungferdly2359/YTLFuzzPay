import React from 'react';
import { View, Text } from 'react-native';
import { SCLine, Button, Image } from '../';
import stylesheet from './stylesheet';

export const NavBar = ({ navigation, title, style, leftButtons, rightButtons }) => {
  const styles = stylesheet.styles();

  return (
    <View style={[styles.container, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.buttonsContainer}>
        {navigation && <Button style={styles.button} type="barItem" text="Back" onPress={() => navigation.goBack()} />}
        {leftButtons && leftButtons.map(({ type = '', ...ops }, i) => <Button style={styles.button} key={i} type={`barItem ${type}`} {...ops} />)}
        <View style={styles.separator} />
        {rightButtons && rightButtons.map(({ type = '', ...ops }, i) => <Button style={styles.button} key={i} type={`barItem ${type}`} {...ops} />)}
      </View>
    </View>
  );
};
