import React, { PureComponent } from 'react';
import { Text, View, KeyboardAvoidingView, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import GridView from 'react-native-super-grid';
import stylesheet from './stylesheet';
import { Image, Button, NavBar, Input, CheckBox } from '../../components';
import resources from '../../resources';
import { getMerchants, getDishes } from '../../../redux/api';
import MerchantPage from '../MerchantPage';
import { setCurrentDid } from '../../../redux/dishes';

const mapStateToProps = ({ merchants, dishes }) => ({
  merchant: merchants.merchants.find(m => m.mid === merchants.currentMid) || merchants.merchants[0],
  dishes: dishes.dishes
});

const addMenu = { imageURL: 'icon_newdish', resizeMode: 'center' };

class MenuPage extends PureComponent {
  static navigationOptions = {
    tabBarIcon: 'icon_menu'
  };

  itemOnPress = item => {
    this.props.setCurrentDid(item.did);
    this.props.navigation.navigate('Dish');
  };

  componentDidMount() {
    this.props.getMerchants().then(() => this.props.merchant && this.props.getDishes(this.props.merchant.mid));
  }

  render() {
    if (!this.props.merchant) {
      return <MerchantPage navigation={this.props.navigation} />;
    }

    const styles = stylesheet.styles();
    const data = [...this.props.dishes, addMenu];
    return (
      <View style={styles.container}>
        <NavBar title={this.props.navigation.state.routeName} rightButtons={[{ text: 'Merchant', type: 'done', onPress: () => this.props.navigation.navigate('Merchant') }]} />
        <GridView
          contentContainerStyle={styles.contentContainer}
          fixed
          spacing={10}
          itemDimension={145}
          items={data}
          renderItem={item => (
            <View style={styles.itemContainer}>
              <TouchableHighlight onPress={() => this.itemOnPress(item)} style={styles.touchable}>
                <Image style={styles.image} source={item.imageURL} resizeMode={item.resizeMode}>
                  {item.price != null && <Text style={styles.price}>${item.price}</Text>}
                </Image>
              </TouchableHighlight>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, {
  setCurrentDid,
  getMerchants,
  getDishes
})(MenuPage);
