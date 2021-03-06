import React, { PureComponent } from 'react';
import moment from 'moment';
import { Text, View, ScrollView, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Button, NavBar, Cell } from '../../components';
import { setCurrentHawkerId } from '../../../redux/hawkers';
import { setCurrentMerchantId } from '../../../redux/merchants';
import { OrderHelper, MoneyHelper, UserHelper } from '../../../helpers';
import { updateOrderStatus } from '../../../redux/orders';

const mapStateToProps = ({ orders }) => ({
  currentOrder: orders.orders.find(o => o.oid === orders.currentOrderId) || {}
});

class OrderPage extends PureComponent {
  gotoHawker = () => {
    this.props.setCurrentHawkerId(this.props.currentOrder.hid);
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'Hawkers',
        action: NavigationActions.reset({ index: 1, actions: [this.props.navigation.navigate('HawkersMain'), this.props.navigation.navigate('Hawker')] })
      })
    );
  };

  gotoMerchant = () => {
    this.props.setCurrentHawkerId(this.props.currentOrder.hid);
    this.props.setCurrentMerchantId(this.props.currentOrder.mid);
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'Hawkers',
        action: NavigationActions.reset({ index: 1, actions: [this.props.navigation.navigate('HawkersMain'), this.props.navigation.navigate('Merchant')] })
      })
    );
  };

  cancelOrder = () => {
    const title = UserHelper.isCustomer() ? 'Cancel' : 'Refuse';
    Alert.alert(title + 'Order', 'Are you sure you want to ' + title.toLowerCase() + ' the order?', [
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          this.updateOrderStatus(OrderHelper.orderStatus.cancelled).then(() => this.props.navigation.goBack());
        }
      },
      {
        text: 'No',
        style: 'cancel'
      }
    ]);
  };

  updateOrderStatus = status => this.props.updateOrderStatus(this.props.currentOrder.oid, status);

  render() {
    const styles = stylesheet.styles();
    const isCustomer = UserHelper.isCustomer();
    const { hawkerName, merchantName, dishName, description, price, takeAway, takeAwayPrice, status, createdDate, paymentMethod, queueNumber } = this.props.currentOrder;
    return (
      <View style={styles.container}>
        <NavBar title="Order Details" navigation={this.props.navigation} />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Cell>
            <Text style={styles.title}>Order Date</Text>
            <Text style={styles.detail}>{moment(createdDate).format('DD/MM/YY [at] hh:mm a')}</Text>
          </Cell>
          {isCustomer && (
            <Cell disclosure onPress={this.gotoHawker}>
              <Text style={styles.title}>Hawker</Text>
              <Text style={styles.detail}>{hawkerName}</Text>
            </Cell>
          )}
          {isCustomer && (
            <Cell disclosure onPress={this.gotoMerchant}>
              <Text style={styles.title}>Merchant</Text>
              <Text style={styles.detail}>{merchantName}</Text>
            </Cell>
          )}
          <Cell>
            <Text style={styles.title}>Dish</Text>
            <Text style={styles.detail}>{dishName}</Text>
          </Cell>
          <Cell>
            <Text style={styles.title}>Description</Text>
            <Text style={styles.detail}>{description || '-'}</Text>
          </Cell>
          <Cell>
            <Text style={styles.title}>Take Away</Text>
            <Text style={styles.detail}>{takeAway ? 'Yes' : 'No'}</Text>
          </Cell>
          <Cell>
            <Text style={styles.title}>Payment By</Text>
            <Text style={styles.detail}>{OrderHelper.paymentMethod[paymentMethod]}</Text>
          </Cell>
          <Cell>
            <Text style={styles.title}>Queue Number</Text>
            <Text style={styles.detail}>{queueNumber || 'N/A'}</Text>
          </Cell>
          <Cell>
            <Text style={styles.title}>Price</Text>
            <Text style={styles.detail}>{MoneyHelper.display(price)}</Text>
          </Cell>
          {takeAwayPrice != null && (
            <Cell>
              <Text style={styles.title}>Take Away Price</Text>
              <Text style={styles.detail}>{MoneyHelper.display(takeAwayPrice)}</Text>
            </Cell>
          )}
          <Cell>
            <Text style={styles.title}>Status</Text>
            <Text style={[styles.detail, { color: OrderHelper.orderStatusColor[status] }]}>{OrderHelper.orderStatusDisplay[status]}</Text>
          </Cell>
          {!isCustomer &&
            status < OrderHelper.orderStatus.completed && (
              <Button
                type={status == OrderHelper.orderStatus.collecting ? 'positive' : 'primary'}
                style={styles.button}
                text={'Set as ' + OrderHelper.orderStatusDisplay[status + 1]}
                onPress={() => this.updateOrderStatus(status + 1)}
              />
            )}
          {status == OrderHelper.orderStatus.pending && (
            <Button type="destructive" style={styles.button} text={isCustomer ? 'Cancel Order' : 'Refuse Order'} onPress={this.cancelOrder} />
          )}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  {
    setCurrentHawkerId,
    setCurrentMerchantId,
    updateOrderStatus
  }
)(OrderPage);
