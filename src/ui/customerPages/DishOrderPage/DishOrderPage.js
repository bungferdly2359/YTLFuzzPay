import React, { Component } from 'react';
import { Text, View, FlatList, TouchableHighlight, Linking, Alert, ScrollView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Image, Button, NavBar, Input, CheckBox, Cell, SearchBar, LazyView, PopupView, InputText } from '../../components';
import { addItemToCart } from '../../../redux/orders';
import { MoneyHelper } from '../../../helpers';

const mapStateToProps = state => ({
  dish: state.dishes.dishesByMerchantId[state.merchants.currentMerchantId || 'Jjpbp81522998395'].find(d => d.did == (state.dishes.currentDishId || 'Jjpbp8152300046'))
});

class DishOrderPage extends Component {
  state = {
    optionIndexes: [],
    additional: '',
    totalPrice: ''
  };

  componentWillMount() {
    this.reloadTotalPrice();
  }

  shouldComponentUpdate() {
    return false;
  }

  toggleOptionIndex = index => {
    this.state.optionIndexes = this.state.optionIndexes.toggle(index);
    this.reloadTotalPrice();
  };

  reloadTotalPrice = () => {
    const { dish = {} } = this.props;
    const { options = [] } = dish;

    let price = MoneyHelper.price(dish.price);
    this.state.optionIndexes.forEach(i => {
      price += MoneyHelper.price(options[i].price);
    });
    this.state.totalPrice = price;
    if (this.totalView) {
      this.totalView.reRender();
    }
  };

  showAdditionalInfo = () => {
    Alert.alert('Additional Request', "You may ask something that isn't described in the menu. Please note that your request may not be fulfilled if it cost additional money.", [
      { text: 'Got It', style: 'cancel' }
    ]);
  };

  addToCart = () => {
    const { dish = {} } = this.props;
    const { options = [] } = dish;
    const { optionIndexes, additional, totalPrice } = this.state;
    let params = {
      did: dish.did,
      name: dish.name,
      total: totalPrice
    };
    if (optionIndexes.length > 0) {
      params.options = optionIndexes.map(i => options[i].name).join(', ');
    }
    if (additional.length > 0) {
      params.additional = additional;
    }
    this.props.addItemToCart(params);
    this.props.navigation.goBack();
  };

  render() {
    const styles = stylesheet.styles();
    const { dish = {}, navigation } = this.props;
    const { refreshing } = this.state;
    return (
      <PopupView title={dish.name} navigation={navigation}>
        <Text style={[styles.text, styles.title]}>Price</Text>
        <View style={styles.contentContainer}>
          <Text style={[styles.text, styles.price]}>{MoneyHelper.display(dish.price)}</Text>
        </View>
        {(dish.options || []).length > 0 && (
          <View>
            <Text style={[styles.text, styles.title]}>Extra</Text>
            <ScrollView keyboardShouldPersistTaps="handled" style={[styles.contentContainer, styles.extraContainer]}>
              {dish.options.map((e, i) => (
                <View key={i} style={styles.horizontal}>
                  <CheckBox style={styles.checkbox} textStyle={[styles.text, styles.extraName]} onChangeValue={() => this.toggleOptionIndex(i)} text={e.name} />
                  <Text style={[styles.text, styles.price]}>{MoneyHelper.display(e.price)}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        <View style={styles.horizontal}>
          <Text style={[styles.text, styles.title]}>Additional Request</Text>
          <Button icon="icon_info" style={styles.infoButton} iconStyle={styles.infoIcon} onPress={this.showAdditionalInfo} />
        </View>
        <View style={[styles.contentContainer, styles.additionalContainer]}>
          <InputText inputStyle={styles.inputText} multiline keyboardDismissMode="interactive" onChangeText={t => (this.state.additional = t)} />
        </View>
        <View style={[styles.horizontal, styles.cartContainer]}>
          <Button style={styles.cartButton} type="primary gradient" text="Add to Cart" onPress={this.addToCart} />
          <View>
            <Text style={[styles.text, styles.totalTitle]}>Total</Text>
            <LazyView ref={r => (this.totalView = r)} render={() => <Text style={[styles.text, styles.totalPrice]}>{MoneyHelper.display(this.state.totalPrice)}</Text>} />
          </View>
        </View>
      </PopupView>
    );
  }
}

export default connect(mapStateToProps, { addItemToCart })(DishOrderPage);
