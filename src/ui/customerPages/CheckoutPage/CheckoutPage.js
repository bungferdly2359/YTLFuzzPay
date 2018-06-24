import React, { PureComponent } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { NavBar, Cell, Image, FlatList, Button, RadioButton } from '../../components';
import stylesheet from './stylesheet';
import { MoneyHelper } from '../../../helpers';

const mapStateToProps = state => ({
  items: state.orders.cart
});

class CheckoutPage extends PureComponent {
  state = {
    retrieveMethod: -1,
    paymentMethod: -1
  };

  takeAwayPrice = () => {
    const { items } = this.props;
    return items.reduce((x, y) => x + (y.merchant.takeAwayPrice || 0), 0);
  };

  totalPrice = () => {
    const { items } = this.props;
    let price = items.reduce((x, y) => x + y.totalPrice, 0);
    if (this.state.retrieveMethod == 1) {
      price += this.takeAwayPrice();
    }
    return price;
  };

  showCashInfo = () => {
    Alert.alert('Cash', 'You go to the store and pay when your food is ready', [{ text: 'Got It', style: 'cancel' }]);
  };

  render() {
    const { retrieveMethod, paymentMethod } = this.state;
    const { items, navigation } = this.props;
    const takeAwayPrice = this.takeAwayPrice();
    const styles = stylesheet.styles();
    console.log(retrieveMethod);
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
              value={retrieveMethod == 0}
              onPress={() => this.setState({ retrieveMethod: 0 })}
            />
          </View>
          <View style={styles.priceContainer}>
            <RadioButton
              style={styles.radioButton}
              textStyle={[styles.text, styles.radioButtonText]}
              text="Take away"
              value={retrieveMethod == 1}
              onPress={() => this.setState({ retrieveMethod: 1 })}
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
            <Button icon="icon_info" style={styles.infoButton} iconStyle={styles.infoIcon} onPress={this.showCashInfo} />
          </View>
        </ScrollView>
        <View style={styles.totalContainer}>
          <Text style={styles.total}>Total</Text>
          <Text style={[styles.total, styles.totalPrice]}>{MoneyHelper.display(this.totalPrice())}</Text>
        </View>
        <Button style={styles.cartButton} type="primary gradient" text="Place Order" onPress={this.addToCart} />
      </View>
    );
  }
}

export default connect(mapStateToProps)(CheckoutPage);
