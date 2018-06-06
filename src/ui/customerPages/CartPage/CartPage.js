import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavBar, Cell, Image, FlatList } from '../../components';
import stylesheet from './stylesheet';

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
  state = {};
  render() {
    const { items } = this.props;
    const styles = stylesheet.styles();
    return (
      <View style={styles.container}>
        <NavBar title="Shopping Cart" />
        <FlatList
          emptyText="Your cart is empty"
          data={items}
          renderItem={({ item }) => {
            let { dish = {}, totalPrice = 0, additional = '', optionIndexes = [] } = item;
            let extra = optionIndexes.length > 0 ? `Extra : ${optionIndexes.map(i => dish.options[i].name).join(', ')}` : null;
            let addition = additional.length > 0 ? `Notes : ${additional}` : null;
            return (
              <Cell>
                <Image style={styles.image} resizeMode="cover" source={dish.imageURL} />
                <View style={styles.detailContainer}>
                  <Text style={styles.title}>{dish.name}</Text>
                  {extra && <Text style={styles.info}>{extra}</Text>}
                  {addition && <Text style={styles.info}>{addition}</Text>}
                </View>
              </Cell>
            );
          }}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, {})(CartPage);
