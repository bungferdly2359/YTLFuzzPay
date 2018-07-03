import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Image } from '../';
import resources from '../../resources';
import stylesheet, { gradientColors } from './stylesheet';

//type = 'primary';

const buildStyles = (types, suffix, def) => {
  const styles = stylesheet.styles();
  const capSuffix = suffix.charAt(0).toUpperCase() + suffix.slice(1);
  return [styles[suffix], ...types.map(t => styles[t + capSuffix]), def];
};

export const Button = ({ type = '', icon, text, style, onPress, textStyle, iconStyle, gradient = true, numberOfLines = 1, disabled = false, children }) => {
  const types = type.split(' ').filter(t => t);
  const colors = gradient && types.findMap(t => gradientColors[t]);
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} disabled={disabled} style={buildStyles(types, 'container', style)}>
      {colors && <LinearGradient colors={colors} style={buildStyles(types, 'gradient')} />}
      {icon != null && <Image style={buildStyles(types, 'icon', iconStyle)} source={icon} />}
      {text != null && (
        <Text style={buildStyles(types, 'text', textStyle)} numberOfLines={numberOfLines}>
          {text}
        </Text>
      )}
      {children}
    </TouchableOpacity>
  );
};
