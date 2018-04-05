import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Image, Button, NavBar, Input, CheckBox, Section } from '../../components';
import resources from '../../resources';
import { getOrders, updateOrderStatus } from '../../../redux/api';
import { MerchantHelper, OrderHelper } from '../../../helpers';

const mapStateToProps = ({ merchants, orders }) => ({
  merchant: MerchantHelper.currentMerchant(merchants),
  orders: orders.orders
});

class OrdersPage extends Component {
  static navigationOptions = {
    tabBarIcon: 'icon_orders'
  };

  state = {
    refreshing: false
  };

  componentDidMount() {
    this.reloadData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.orders !== this.props.orders || nextState.refreshing !== this.state.refreshing;
  }

  reloadData = (fromRefreshControl = true) => {
    const { orders, merchant } = this.props;
    if (merchant) {
      this.setState({ refreshing: true });
      this.props
        .getOrders(this.props.merchant.mid)
        .then(() => this.setState({ refreshing: false }))
        .catch(() => this.setState({ refreshing: false }));
    }
  };

  render() {
    const styles = stylesheet.styles();
    const { orders } = this.props;
    return (
      <View style={styles.container}>
        <NavBar title={this.props.navigation.state.routeName} />
        <FlatList
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.reloadData} />}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item, i) => i.toString()}
          data={orders}
          renderItem={({ item }) => {
            const { customer = {}, menu = {}, oid, status } = item;
            return (
              <Section style={styles.itemContainer}>
                {customer.name != null && (
                  <View style={styles.iconContainer}>
                    <Image style={styles.iconImage} source={customer.imageURL} />
                    <Text style={styles.iconText}>{customer.name}</Text>
                  </View>
                )}
                <View style={styles.menuContainer}>
                  {menu.map((m, i) => (
                    <View key={i} style={styles.dishContainer}>
                      <Text style={styles.dishName}>{m.name}</Text>
                      {(m.additional || '').length > 0 && <Text style={styles.dishDetail}>{m.additional}</Text>}
                    </View>
                  ))}
                </View>
                <CheckBox value={status == 'done'} style={styles.checkbox} onChangeValue={selected => this.props.updateOrderStatus(oid, selected ? 'done' : 'pending')} />
              </Section>
            );
          }}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, {
  getOrders,
  updateOrderStatus
})(OrdersPage);
