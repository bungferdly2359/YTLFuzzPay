import React, { PureComponent } from 'react';
import moment from 'moment';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Image, Button, NavBar, Input, CheckBox, Section, FlatList, Cell } from '../../components';
import resources from '../../resources';
import { updateOrderStatus, getOrders, setCurrentOrderId } from '../../../redux/orders';
import { OrderHelper, UserHelper, IdHelper, StateHelper } from '../../../helpers';

const mapStateToProps = state => ({
  orders: state.orders.orders,
  mid: StateHelper.getCurrentMerchant(state).mid
});

let ordersPage = null;

class OrdersPage extends PureComponent {
  static navigationOptions = {
    tabBarIcon: {
      icon: 'icon_orders',
      mapStateToUnread: state => state.orders.orders.filter(o => o.status < OrderHelper.orderStatus.completed).length,
      onPress: () => ordersPage && ordersPage.reloadData(true)
    }
  };

  state = {
    refreshing: false
  };

  constructor(props) {
    super(props);
    ordersPage = this;
  }

  componentDidMount() {
    this.reloadData(true);
  }

  reloadData = silent => {
    const { orders, mid } = this.props;
    const isCustomer = UserHelper.isCustomer();
    if (!silent || orders.length == 0) {
      this.setState({ refreshing: true });
    }
    this.props
      .getOrders(isCustomer ? { uid: IdHelper.currentUid() } : { mid })
      .then(() => this.setState({ refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  };

  gotoOrderDetails = item => {
    this.props.setCurrentOrderId(item.oid);
    this.props.navigation.navigate('Order');
  };

  render() {
    const styles = stylesheet.styles();
    const { orders } = this.props;
    const { refreshing } = this.state;
    return (
      <View style={styles.container}>
        <NavBar title="Orders" />
        <FlatList
          refreshing={refreshing}
          onRefresh={this.reloadData}
          emptyText="No Order found"
          data={orders}
          renderItem={({ item }) => {
            const { createdDate, dishName, status, queueNumber } = item;
            const showQN = queueNumber != null && status < OrderHelper.orderStatus.completed;
            return (
              <Cell disclosure onPress={this.gotoOrderDetails.bind(this, item)}>
                <View style={styles.cellContainer}>
                  <View style={styles.dishContainer}>
                    <Text style={styles.date}>{moment(createdDate).format('DD/MM/YY')}</Text>
                    <Text style={styles.dishName}>{dishName}</Text>
                    <Text style={[styles.status, { color: OrderHelper.orderStatusColor[status] }]}>{OrderHelper.orderStatusDisplay[status]}</Text>
                  </View>
                  {showQN && <Text style={styles.qnTitle}>Queue Number:</Text>}
                  {showQN && <Text style={styles.qnValue}>{queueNumber}</Text>}
                </View>
              </Cell>
            );
          }}
        />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  {
    getOrders,
    setCurrentOrderId,
    updateOrderStatus
  }
)(OrdersPage);
