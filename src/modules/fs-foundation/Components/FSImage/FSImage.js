import React from 'react';
import { View, Platform, Image as RNImage } from 'react-native';
import CachedImage from 'react-native-cached-image';
import stylesheet from './stylesheet';
import FSResources from '../../Helpers/FSResources';

const FSImage = props => {
  const { children, placeholderSource, source, style, ...otherProps } = props;
  const isUri = source && source.uri != null;
  const RealImage = Platform.OS === 'ios' ? CachedImage : RNImage;
  const styles = stylesheet.styles();
  if (isUri || children) {
    return (
      <View style={style}>
        {placeholderSource && (
          <RNImage resizeMode="contain" {...otherProps} source={FSResources.getResource(placeholderSource)} style={styles.imagePlaceholder} />
        )}
        {isUri && (
          <RealImage
            key={source.uri}
            resizeMode="contain"
            useQueryParamsInCacheKey
            {...otherProps}
            source={FSResources.getResource(source)}
            style={styles.imagePlaceholder}
          />
        )}
        {!isUri && <RNImage resizeMode="contain" {...otherProps} source={FSResources.getResource(source)} style={styles.imagePlaceholder} />}
        {children}
      </View>
    );
  }
  return <RNImage resizeMode="contain" style={style} {...otherProps} source={FSResources.getResource(source)} />;
};

export { FSImage };
