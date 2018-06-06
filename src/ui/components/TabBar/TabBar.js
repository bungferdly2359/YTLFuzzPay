import React from 'react';
import { View, TouchableWithoutFeedback, Image, Text } from 'react-native';
import resources from '../../resources';
import stylesheet from './stylesheet';

const TabBarItem = oriProps => props => {
  const { tab: t, index: i, selectedIndex = 0, onSelectIndex = () => {}, style } = oriProps;
  const { unread = 0 } = props;
  const styles = stylesheet.styles();
  return (
    <TouchableWithoutFeedback key={i} onPress={() => onSelectIndex(i)}>
      <View style={[styles.tabContainer, selectedIndex === i ? styles.selectedTabContainer : null]}>
        <Image style={[styles.icon, selectedIndex === i && styles.iconSelected]} source={resources((t.icon || {}).icon || t.icon)} />
        <Text style={[styles.text, selectedIndex === i && styles.textSelected]}>{t.text}</Text>
        {unread > 0 && (
          <View style={styles.unread}>
            <Text style={styles.unreadText}>{unread}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export const TabBar = ({ tabs = [{ icon: 'icon' }], style, ...otherProps }) => {
  const styles = stylesheet.styles();
  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab, index) => {
        const ItemContainer = (tab.icon || {}).component;
        const Item = TabBarItem({ tab, index, ...otherProps });
        if (ItemContainer) {
          return <ItemContainer key={index} tabBarItem={Item} />;
        }
        return <Item key={index} />;
      })}
    </View>
  );
};
