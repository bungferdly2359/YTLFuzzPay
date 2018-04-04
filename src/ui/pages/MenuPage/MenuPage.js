import React, { PureComponent } from 'react';
import { Text, View, KeyboardAvoidingView, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import GridView from 'react-native-super-grid';
import stylesheet from './stylesheet';
import { Image, Button, NavBar, Input, CheckBox } from '../../components';
import resources from '../../resources';
import { getMerchants } from '../../../redux/api';
import MerchantPage from '../MerchantPage';

const mapStateToProps = ({ merchants }) => ({ merchant: merchants.merchants.find(m => m.mid === merchants.currentMid) || merchants.merchants[0] });

class MenuPage extends PureComponent {
  static navigationOptions = {
    tabBarIcon: 'icon_menu'
  };

  itemOnPress = item => {};

  componentDidMount() {
    this.props.getMerchants();
  }

  render() {
    if (!this.props.merchant) {
      return <MerchantPage navigation={this.props.navigation} />;
    }

    const styles = stylesheet.styles();
    const data = [{ name: 'Fried Chicken Porridge', price: '$3' }, { name: 'Fried Fish Porridge', price: '$3' }, { name: 'Steeamed Chicken Porridge', price: '$3' }];
    return (
      <View style={styles.container}>
        <NavBar title={this.props.navigation.state.routeName} rightButtons={[{ text: 'Merchant', type: 'done', onPress: () => this.props.navigation.navigate('Merchant') }]} />
        <GridView
          fixed
          spacing={10}
          itemDimension={145}
          items={data}
          renderItem={item => (
            <View style={styles.itemContainer}>
              <TouchableHighlight onPress={() => this.itemOnPress(item)} style={styles.touchable}>
                <Image style={styles.image}>
                  <Text style={styles.price}>{item.price}</Text>
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
  getMerchants
})(MenuPage);
