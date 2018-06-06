import React, { PureComponent } from 'react';
import { View, TouchableWithoutFeedback, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import resources from '../../resources';
import stylesheet from './stylesheet';

const TabBarItem = props => {
  const { tab: t, index: i, selectedIndex = 0, onSelectIndex = () => {}, unread = 0 } = props;
  const styles = stylesheet.styles();
  return (
    <TouchableWithoutFeedback onPress={() => onSelectIndex(i)}>
      <View style={[styles.tabContainer, selectedIndex === i ? styles.selectedTabContainer : null]}>
        <Image style={[styles.icon, selectedIndex === i && styles.iconSelected]} source={resources(t.icon)} />
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

const TabBarItemWithRedux = tab => connect(state => ({ unread: tab.mapStateToUnread(state) }))(TabBarItem);

export const TabBar = ({ tabs, style, ...otherProps }) => {
  const styles = stylesheet.styles();
  return (
    <View style={[styles.container, style]}>
      {tabs.map((t, i) => {
        const Item = t.mapStateToUnread ? TabBarItemWithRedux(t) : TabBarItem;
        return <Item key={i} tab={t} index={i} {...otherProps} />;
      })}
    </View>
  );
};
