import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import TabBarItem from './TabBarItem';

const mapStateToProps = state => ({});

class CartPage extends PureComponent {
  static navigationOptions = {
    tabBarIcon: {
      icon: 'icon_cart',
      component: TabBarItem
    }
  };
  state = {};
  render() {
    const styles = stylesheet.styles();
    return <View style={styles.container} />;
  }
}

export default connect(mapStateToProps, {})(CartPage);
