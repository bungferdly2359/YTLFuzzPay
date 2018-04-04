import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Image } from '../';
import resources from '../../resources';
import stylesheet, { gradientColors } from './stylesheet';
import { FSArray } from '../../../modules/fs-foundation';

//type = 'primary';

const buildStyles = (types, suffix, def) => {
  const styles = stylesheet.styles();
  const capSuffix = suffix.charAt(0).toUpperCase() + suffix.slice(1);
  return [styles[suffix], ...types.map(t => styles[t + capSuffix]), def];
};

export const Button = ({ type = 'primary', icon, text, style, onPress, textStyle, iconStyle, gradientStyle, numberOfLines = 1 }) => {
  const types = type.split(' ').filter(t => t);
  const colors = FSArray.findMap(types, t => gradientColors[t]);
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={buildStyles(types, 'container', style)}>
      {colors && <LinearGradient colors={colors} style={buildStyles(types, 'gradient', gradientStyle)} />}
      {icon != null && <Image style={buildStyles(types, 'icon', iconStyle)} source={icon} />}
      {text != null && (
        <Text style={buildStyles(types, 'text', textStyle)} numberOfLines={numberOfLines}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};
