import React, { PureComponent } from 'react';
import moment from 'moment';
import { Text, View, ScrollView, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Image, Button, NavBar, Input, CheckBox, Section, FlatList, Cell } from '../../components';
import resources from '../../resources';
import { setCurrentHawkerId } from '../../../redux/hawkers';
import { setCurrentMerchantId } from '../../../redux/merchants';
import { OrderHelper, MoneyHelper } from '../../../helpers';
import { updateOrderStatus } from '../../../redux/orders';

const mapStateToProps = ({ orders }) => ({ currentOrder: orders.orders.find(o => o.oid === orders.currentOrderId) });

class OrderDetailsPage extends PureComponent {
  gotoHawker = () => {
    this.props.setCurrentHawkerId(this.props.currentOrder.hid);
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [this.props.navigation.navigate('HawkersMain'), this.props.navigation.navigate('Hawker')]
      })
    );
  };

  gotoMerchant = () => {
    this.props.setCurrentHawkerId(this.props.currentOrder.hid);
    this.props.setCurrentMerchantId(this.props.currentOrder.mid);
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [this.props.navigation.navigate('HawkersMain'), this.props.navigation.navigate('Merchant')]
      })
    );
  };

  cancelOrder = () => {
    Alert.alert('Cancel Order', 'Are you sure you want to cancel the order?', [
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          this.props.updateOrderStatus(this.props.currentOrder.oid, OrderHelper.orderStatus.cancelled).then(() => this.props.navigation.goBack());
        }
      },
      {
        text: 'No',
        style: 'cancel'
      }
    ]);
  };

  render() {
    const styles = stylesheet.styles();
    const { hawkerName, merchantName, dishName, description, price, takeAway, takeAwayPrice, status, createdDate, paymentMethod } = this.props.currentOrder;
    return (
      <View style={styles.container}>
        <NavBar title="Order Details" navigation={this.props.navigation} />
        <ScrollView>
          <Cell>
            <Text style={styles.title}>Order Date</Text>
            <Text style={styles.detail}>{moment(createdDate).format('DD/MM/YY [at] hh:mm a')}</Text>
          </Cell>
          <Cell disclosure onPress={this.gotoHawker}>
            <Text style={styles.title}>Hawker</Text>
            <Text style={styles.detail}>{hawkerName}</Text>
          </Cell>
          <Cell disclosure onPress={this.gotoMerchant}>
            <Text style={styles.title}>Merchant</Text>
            <Text style={styles.detail}>{merchantName}</Text>
          </Cell>
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
          {status == OrderHelper.orderStatus.pending && <Button type="gradient primary" style={styles.button} text="Cancel Order" onPress={this.cancelOrder} />}
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
)(OrderDetailsPage);
