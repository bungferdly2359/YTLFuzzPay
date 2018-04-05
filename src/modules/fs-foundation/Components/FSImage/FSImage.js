import React from 'react';
import { View, Platform, Image as RNImage } from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import stylesheet from './stylesheet';
import FSResources from '../../Helpers/FSResources';

const FSImage = props => {
  const { children, placeholderSource, source: src, style, ...otherProps } = props;
  const source = FSResources.getResource(src);
  const isUri = source && source.uri != null && source.uri.startsWith('http');
  const styles = stylesheet.styles();
  if (isUri || children) {
    return (
      <View style={style}>
        {placeholderSource && <RNImage resizeMode="contain" {...otherProps} source={FSResources.getResource(placeholderSource)} style={styles.imagePlaceholder} />}
        {isUri ? (
          <CachedImage resizeMode="contain" useQueryParamsInCacheKey {...otherProps} source={source} style={styles.imagePlaceholder} />
        ) : (
          <RNImage resizeMode="contain" {...otherProps} source={source} style={styles.imagePlaceholder} />
        )}
        {children}
      </View>
    );
  }
  return <RNImage resizeMode="contain" style={style} {...otherProps} source={source} />;
};

export { FSImage };
