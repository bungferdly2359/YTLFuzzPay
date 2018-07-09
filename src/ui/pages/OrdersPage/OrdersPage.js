import React, { Component } from 'react';
import moment from 'moment';
import { Text, View, AppState } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { NavBar, FlatList, Cell, Button } from '../../components';
import { updateOrderStatus, getOrders, setCurrentOrderId, ordersReducer } from '../../../redux/orders';
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
    appState: AppState.currentState,
    showAllOrders: false
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
    return this.props.orders !== nextProps.orders || this.state.refreshing !== nextState.refreshing || this.state.showAllOrders != nextState.showAllOrders;
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
    const { refreshing, showAllOrders } = this.state;
    const dateNow = Date.now(); //1 hour
    const isCustomer = UserHelper.isCustomer();
    const pendingOrders = orders.filter(o => o.status < OrderHelper.orderStatus.completed).sort((o1, o2) => o1.createdDate > o2.createdDate);
    const restOrders = orders.filter(o => o.status >= OrderHelper.orderStatus.completed);
    const displayedOrders = showAllOrders ? [...pendingOrders, ...restOrders] : pendingOrders;
    return (
      <View style={styles.container}>
        <NavBar title="Orders" />
        <FlatList
          refreshing={refreshing}
          onRefresh={this.reloadData}
          emptyText="No Order found"
          data={displayedOrders}
          renderItem={({ item }) => {
            const { createdDate, dishName, status, queueNumber, oid, description, takeAway } = item;
            const showAction = !isCustomer && status < OrderHelper.orderStatus.completed;
            const showQN = (isCustomer && status < OrderHelper.orderStatus.completed) || (!isCustomer && status == OrderHelper.orderStatus.collecting);
            const showDesc = showAction && !showQN;
            let date = '';
            if (createdDate >= dateNow - 120000) {
              date = 'just now';
            } else if (createdDate > dateNow - 3600000) {
              date = Math.floor((dateNow - createdDate) / 60000) + ' mins';
            } else {
              date = moment(createdDate).format('DD/MM/YY');
            }
            return (
              <Cell disclosure onPress={this.gotoOrderDetails.bind(this, item)}>
                <View style={styles.cellContainer}>
                  <View style={styles.dishContainer}>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.dishName}>{dishName}</Text>
                    <Text style={[styles.status, { color: OrderHelper.orderStatusColor[status] }]}>{OrderHelper.orderStatusDisplay[status]}</Text>
                  </View>
                  {(showAction || showQN || showDesc) && (
                    <View style={styles.detailContainer}>
                      <View style={styles.queueContainer}>
                        {showQN && <Text style={styles.qnTitle}>Queue:</Text>}
                        {showQN && <Text style={styles.qnValue}>{queueNumber || 'N/A'}</Text>}
                        {showDesc && takeAway && <Text style={styles.detail}>Take Away</Text>}
                        {showDesc && (description || '').length > 0 && <Text style={styles.detail}>{description}</Text>}
                      </View>
                      {showAction && (
                        <Button
                          style={styles.actionButton}
                          type={status == OrderHelper.orderStatus.collecting ? 'positive' : 'primary'}
                          text={OrderHelper.orderStatusDisplay[status + 1]}
                          onPress={() => this.props.updateOrderStatus(oid, status + 1)}
                        />
                      )}
                    </View>
                  )}
                </View>
              </Cell>
            );
          }}
          ListFooterComponent={
            restOrders.length > 0 ? (
              <Button
                style={styles.footer}
                type="barItem"
                text={showAllOrders ? 'Hide completed orders' : 'Show completed orders'}
                onPress={() => this.setState({ showAllOrders: !showAllOrders })}
              />
            ) : null
          }
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
