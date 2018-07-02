import React from 'react';
import { Image as RNImage, ImageBackground } from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import FSResources from '../../Helpers/FSResources';

export const FSImage = ({ source, defaultSource, style, resizeMode, children, ...otherProps }) => {
  const src = FSResources.getResource(source);
  const pSrc = FSResources.getResource(defaultSource);
  const imgProps = {
    useQueryParamsInCacheKey: true,
    resizeMode,
    source: src,
    defaultSource: pSrc,
    style,
    children,
    ...otherProps
  };
  if (FSResources.isUri(src)) {
    return <CachedImage {...imgProps} />;
  } else if (children) {
    return <ImageBackground {...imgProps} />;
  } else {
    return <RNImage {...imgProps} />;
  }
};
