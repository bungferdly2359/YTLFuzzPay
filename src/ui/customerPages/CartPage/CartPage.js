import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { NavBar, Cell, Image, FlatList, Button } from '../../components';
import stylesheet from './stylesheet';
import { MoneyHelper } from '../../../helpers';
import { removeItemFromCart } from '../../../redux/orders';
import { setCurrentHawkerId } from '../../../redux/hawkers';
import { setCurrentMerchantId } from '../../../redux/merchants';

const mapStateToProps = state => ({
  items: state.orders.cart
});

class CartPage extends PureComponent {
  static navigationOptions = {
    tabBarIcon: {
      icon: 'icon_cart',
      mapStateToUnread: state => state.orders.cart.length
    }
  };

  gotoHawkerOfItem = item => {
    const { hawker } = item;
    this.props.setCurrentHawkerId(hawker.hid);
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [this.props.navigation.navigate('HawkersMain'), this.props.navigation.navigate('Hawker')]
      })
    );
  };

  gotoMerchantOfItem = item => {
    const { hawker, merchant } = item;
    this.props.setCurrentHawkerId(hawker.hid);
    this.props.setCurrentMerchantId(merchant.mid);
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [this.props.navigation.navigate('HawkersMain'), this.props.navigation.navigate('Merchant')]
      })
    );
  };

  render() {
    const { items } = this.props;
    const styles = stylesheet.styles();
    return (
      <View style={styles.container}>
        <NavBar title="Shopping Cart" rightButtons={items.length > 0 ? [{ text: 'Checkout' }] : null} />
        <FlatList
          emptyText="Your cart is empty"
          data={items}
          renderItem={({ item }) => {
            let { hawker = {}, merchant = {}, dish = {}, totalPrice = 0, additional = '', optionIndexes = [] } = item;
            let extra = optionIndexes.length > 0 ? `Extra : ${optionIndexes.map(i => dish.options[i].name).join(', ')}` : null;
            let addition = additional.length > 0 ? `Notes : ${additional}` : null;
            return (
              <Cell contentContainerStyle={styles.cell}>
                <Text style={styles.directory}>
                  <Text style={styles.directoryName} onPress={this.gotoHawkerOfItem.bind(this, item)}>
                    {hawker.name}
                  </Text>
                  {'  >  '}
                  <Text style={styles.directoryName} onPress={this.gotoMerchantOfItem.bind(this, item)}>
                    {merchant.number} - {merchant.name}
                  </Text>
                </Text>
                <View style={styles.dishContainer}>
                  <Image style={styles.image} resizeMode="cover" source={dish.imageURL} />
                  <View style={styles.detailContainer}>
                    <Text style={styles.title}>{dish.name}</Text>
                    {extra && <Text style={styles.info}>{extra}</Text>}
                    {addition && <Text style={styles.info}>{addition}</Text>}
                  </View>
                  <Text style={styles.title}>{MoneyHelper.display(totalPrice)}</Text>
                  <Button type="none" icon="icon_trash" iconStyle={styles.trashIcon} onPress={() => this.props.removeItemFromCart(item)} />
                </View>
              </Cell>
            );
          }}
        />
        {items.length > 0 && (
          <View style={styles.totalContainer}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>{MoneyHelper.display(items.reduce((x, y) => x + y.totalPrice, 0))}</Text>
          </View>
        )}
      </View>
    );
  }
}

export default connect(mapStateToProps, { removeItemFromCart, setCurrentHawkerId, setCurrentMerchantId })(CartPage);
