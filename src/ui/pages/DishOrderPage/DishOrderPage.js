import React, { Component } from 'react';
import { Text, View, FlatList, TouchableHighlight, Linking, Alert, ScrollView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Image, Button, NavBar, Input, CheckBox, Cell, SearchBar, LazyView, PopupView, InputText } from '../../components';
import { addItemToCart } from '../../../redux/orders';
import { MoneyHelper, StateHelper } from '../../../helpers';

const mapStateToProps = state => ({
  hawker: StateHelper.getCurrentHawker(state),
  merchant: StateHelper.getCurrentMerchant(state),
  dish: StateHelper.getCurrentDish(state)
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
    Alert.alert('Notes', "You may ask something that isn't described in the menu. Please note that your request may not be fulfilled if it cost additional money.", [
      { text: 'Got It', style: 'cancel' }
    ]);
  };

  addToCart = () => {
    const { dish = {}, hawker = {}, merchant = {} } = this.props;
    this.props.addItemToCart({ dish, hawker, merchant, ...this.state });
    this.props.navigation.goBack();
  };

  render() {
    const styles = stylesheet.styles();
    const { dish = {}, navigation } = this.props;
    return (
      <PopupView style={styles.container} navigation={navigation}>
        <ScrollView>
          {dish.imageURL != null && <Image resizeMode="cover" source={dish.imageURL} style={styles.image} />}
          <View style={styles.contentContainer}>
            <Text style={[styles.text, styles.title]}>{dish.name}</Text>
            {dish.description && <Text style={[styles.text, styles.description]}>{dish.description}</Text>}
            <View style={styles.content2Container}>
              <View style={styles.priceContainer}>
                <Text style={[styles.text, styles.priceTitle]}>Price</Text>
                <View style={styles.priceSeparator} />
                <Text style={styles.text}>{MoneyHelper.display(dish.price)}</Text>
              </View>
              {(dish.options || []).length > 0 && (
                <View style={styles.priceContainer}>
                  <Text style={[styles.text, styles.priceTitle]}>Extra</Text>
                </View>
              )}
              {(dish.options || []).length > 0 &&
                dish.options.map((e, i) => (
                  <View key={i} style={styles.priceContainer}>
                    <CheckBox style={styles.checkbox} textStyle={[styles.text, styles.checkboxTitle]} onChangeValue={() => this.toggleOptionIndex(i)} text={e.name} />
                    <View style={styles.priceSeparator} />
                    <Text style={styles.text}>{MoneyHelper.display(e.price)}</Text>
                  </View>
                ))}
              <View style={styles.priceContainer}>
                <Text style={[styles.text, styles.priceTitle]}>Notes</Text>
                <Button icon="icon_info" style={styles.infoButton} iconStyle={styles.infoIcon} onPress={this.showAdditionalInfo} />
              </View>
              <InputText inputStyle={styles.inputText} multiline keyboardDismissMode="interactive" onChangeText={t => (this.state.additional = t)} autogrow />
            </View>
          </View>
        </ScrollView>
        <View style={styles.totalContainer}>
          <Text style={[styles.text, styles.priceTitle]}>Total</Text>
          <LazyView ref={r => (this.totalView = r)} render={() => <Text style={[styles.text, styles.priceTitle]}>{MoneyHelper.display(this.state.totalPrice)}</Text>} />
        </View>
        <Button style={styles.cartButton} type="primary gradient" text="Add to Cart" onPress={this.addToCart} />
      </PopupView>
    );
  }
}

export default connect(
  mapStateToProps,
  { addItemToCart }
)(DishOrderPage);
