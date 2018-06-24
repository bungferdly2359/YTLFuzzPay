import React, { PureComponent } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Image, NavBar, FlatList } from '../../components';
import { setCurrentDishId, getDishesByMerchantId } from '../../../redux/dishes';
import { StateHelper, AlertHelper } from '../../../helpers';

const mapStateToProps = state => ({
  merchant: StateHelper.getCurrentMerchant(state),
  dishes: state.dishes.dishesByMerchantId[state.merchants.currentMerchantId]
});

class MerchantPage extends PureComponent {
  state = {
    refreshing: false
  };

  componentDidMount() {
    this.reloadData(true);
  }

  onPressItem = item => {
    if (this.props.merchant.online) {
      this.props.setCurrentDishId(item.did);
      this.props.navigation.navigate('DishOrder');
    } else {
      AlertHelper.showError('Cannot order a dish when the merchant is offline');
    }
  };

  reloadData = silent => {
    const { merchant, dishes } = this.props;
    if (!silent || dishes == null || dishes.length == 0) {
      this.setState({ refreshing: true });
    }
    this.props
      .getDishesByMerchantId(merchant.mid)
      .then(() => this.setState({ refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  };

  render() {
    const { merchant, dishes = [] } = this.props;
    const { refreshing } = this.state;
    const styles = stylesheet.styles();
    return (
      <View style={styles.container}>
        <NavBar
          title={
            <Text>
              {merchant.name}
              {'\n'}
              <Text style={styles.location}>{merchant.number}</Text>
            </Text>
          }
          navigation={this.props.navigation}
        />
        <FlatList
          type="grid"
          emptyText="Empty store"
          refreshing={refreshing}
          onRefresh={this.reloadData}
          spacing={10}
          data={dishes}
          ListHeaderComponent={
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionText}>Menu</Text>
            </View>
          }
          renderItem={item => (
            <TouchableHighlight onPress={this.onPressItem.bind(this, item)} style={styles.touchable}>
              <View style={styles.itemContainer}>
                <Image style={styles.image} source={item.imageURL} resizeMode={item.resizeMode} />
                <Text style={styles.name}>{item.name}</Text>
                {item.description && (
                  <Text style={styles.info} numberOfLines={1}>
                    {item.description}
                  </Text>
                )}
                <Text style={styles.info}>{item.available ? `S$ ${item.price}` : 'Unavailable'}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  {
    setCurrentDishId,
    getDishesByMerchantId
  }
)(MerchantPage);
