import React from 'react';
import { View, TouchableWithoutFeedback, Image, Text } from 'react-native';
import resources from '../../resources';
import stylesheet from './stylesheet';

export const TabBar = ({ tabs = [{ icon: 'icon' }], selectedIndex = 0, onSelectIndex = () => {}, style }) => {
  const styles = stylesheet.styles();
  return (
    <View style={[styles.container, style]}>
      {tabs.map((t, i) => (
        <TouchableWithoutFeedback key={i} onPress={() => onSelectIndex(i)}>
          <View style={[styles.tabContainer, selectedIndex === i ? styles.selectedTabContainer : null]}>
            <Image style={[styles.icon, selectedIndex === i && styles.iconSelected]} source={resources(t.icon)} />
            <Text style={[styles.text, selectedIndex === i && styles.textSelected]}>{t.text}</Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};
