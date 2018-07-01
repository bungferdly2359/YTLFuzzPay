import React, { PureComponent } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { NavBar, Cell, Image, FlatList, Button, RadioButton } from '../../components';
import stylesheet from './stylesheet';
import { MoneyHelper, IdHelper, OrderHelper } from '../../../helpers';
import { makeOrder, getOrdersAsCustomer } from '../../../redux/orders/ordersActions';

const mapStateToProps = state => ({
  items: state.orders.cart
});

class CheckoutPage extends PureComponent {
  state = {
    takeAway: undefined,
    paymentMethod: undefined
  };

  takeAwayPrice = () => {
    const { items } = this.props;
    return items.reduce((x, y) => x + (y.merchant.takeAwayPrice || 0), 0);
  };

  totalPrice = () => {
    const { items } = this.props;
    let price = items.reduce((x, y) => x + y.totalPrice, 0);
    if (this.state.takeAway) {
      price += this.takeAwayPrice();
    }
    return price;
  };

  showCashInfo = () => {
    Alert.alert('Cash', 'You go to the store and pay when your food is ready', [{ text: 'Got It', style: 'cancel' }]);
  };

  checkout = () => {
    if (this.state.takeAway === undefined || this.state.paymentMethod === undefined) {
      return;
    }
    const createdDate = Date.now();
    this.props
      .makeOrder(
        this.props.items.map((i, n) => ({
          oid: `${IdHelper.createId()}${n === 0 ? '' : `_${n + 1}`}`,
          uid: IdHelper.currentUid(),
          hid: i.hawker.hid,
          hawkerName: i.hawker.name,
          mid: i.merchant.mid,
          merchantName: i.merchant.name,
          did: i.dish.did,
          dishName: i.dish.name,
          description: OrderHelper.getCartItemDescription(i),
          price: i.totalPrice,
          ...(this.state.takeAway ? { takeAwayPrice: i.merchant.takeAwayPrice } : {}),
          status: OrderHelper.orderStatus.pending,
          createdDate,
          ...this.state
        }))
      )
      .then(() => {
        Alert.alert('Success', 'Your order has been placed', [{ text: 'Ok', style: 'cancel', onPress: () => this.props.navigation.goBack() }]);
        this.props.getOrdersAsCustomer();
      });
  };

  render() {
    const { takeAway, paymentMethod } = this.state;
    const { items, navigation } = this.props;
    const takeAwayPrice = this.takeAwayPrice();
    const styles = stylesheet.styles();
    return (
      <View style={styles.container}>
        <NavBar title="Checkout" navigation={navigation} />
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View style={styles.priceContainer}>
            <Text style={[styles.text, styles.priceTitle]}>Cart</Text>
            <View style={styles.priceSeparator} />
            <Text style={styles.text}>{MoneyHelper.display(items.reduce((x, y) => x + y.totalPrice, 0))}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={[styles.text, styles.priceTitle]}>Dine-in or take away?</Text>
          </View>
          <View style={styles.priceContainer}>
            <RadioButton
              style={styles.radioButton}
              textStyle={[styles.text, styles.radioButtonText]}
              text="Dine-in"
              value={takeAway === false}
              onPress={() => this.setState({ takeAway: false })}
            />
          </View>
          <View style={styles.priceContainer}>
            <RadioButton
              style={styles.radioButton}
              textStyle={[styles.text, styles.radioButtonText]}
              text="Take away"
              value={takeAway === true}
              onPress={() => this.setState({ takeAway: true })}
            />
            {takeAwayPrice > 0 && <View style={styles.priceSeparator} />}
            {takeAwayPrice > 0 && <Text style={styles.text}>{MoneyHelper.display(takeAwayPrice)}</Text>}
          </View>
          <View style={styles.priceContainer}>
            <Text style={[styles.text, styles.priceTitle]}>Payment method</Text>
          </View>
          <View style={styles.priceContainer}>
            <RadioButton
              style={styles.radioButton}
              textStyle={[styles.text, styles.radioButtonText]}
              text="Cash"
              value={paymentMethod == 0}
              onPress={() => this.setState({ paymentMethod: 0 })}
            />
            <Button type="plain" icon="icon_info" iconStyle={styles.infoIcon} onPress={this.showCashInfo} />
          </View>
        </ScrollView>
        <View style={styles.totalContainer}>
          <Text style={styles.total}>Total</Text>
          <Text style={[styles.total, styles.totalPrice]}>{MoneyHelper.display(this.totalPrice())}</Text>
        </View>
        <Button style={styles.cartButton} type="primary gradient" text="Place Order" onPress={this.checkout} />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  { makeOrder, getOrdersAsCustomer }
)(CheckoutPage);
