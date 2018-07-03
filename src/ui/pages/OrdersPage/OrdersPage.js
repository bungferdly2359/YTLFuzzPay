import React, { Component } from 'react';
import moment from 'moment';
import { Text, View, AppState } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { NavBar, FlatList, Cell } from '../../components';
import { updateOrderStatus, getOrders, setCurrentOrderId } from '../../../redux/orders';
import { OrderHelper, UserHelper, IdHelper, StateHelper } from '../../../helpers';

const mapStateToProps = state => ({
  orders: state.orders.orders,
  mid: (StateHelper.getCurrentMerchant(state) || {}).mid,
  isCurrentRoute: StateHelper.getCurrentRoute(state).routeName === 'OrderMain'
});

class OrdersPage extends Component {
  static navigationOptions = {
    tabBarIcon: {
      icon: 'icon_orders',
      mapStateToUnread: state => state.orders.orders.filter(o => o.status < OrderHelper.orderStatus.completed).length
    }
  };

  state = {
    refreshing: false,
    appState: AppState.currentState
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isCurrentRoute && !this.props.isCurrentRoute) {
      this.reloadData(true);
    }
  }

  componentDidMount() {
    this.reloadData(true);
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.reloadData(true);
    }
    this.state.appState = nextAppState;
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.orders !== nextProps.orders || this.state.refreshing !== nextState.refreshing;
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
    const dateNow = Date.now(); //1 hour
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
                    <Text style={styles.date}>
                      {createdDate > dateNow - 3600000 ? Math.floor((dateNow - createdDate) / 60000) + ' mins' : moment(createdDate).format('DD/MM/YY')}
                    </Text>
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
