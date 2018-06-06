import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';

const mapStateToProps = state => ({
  unread: state.orders.cart.length
});

class TabBarItem extends PureComponent {
  state = {};
  render() {
    const { tabBarItem: Item, unread } = this.props;
    return <Item unread={unread} />;
  }
}

export default connect(mapStateToProps, {})(TabBarItem);
