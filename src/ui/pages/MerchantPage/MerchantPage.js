import React, { PureComponent } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Image, NavBar, FlatList } from '../../components';
import { setCurrentDishId, getDishesByMerchantId } from '../../../redux/dishes';
import { StateHelper, AlertHelper, MoneyHelper, IdHelper } from '../../../helpers';
import MerchantEditPage from '../MerchantEditPage';

const mapStateToProps = state => ({
  merchant: StateHelper.getCurrentMerchant(state),
  dishes: StateHelper.getDishes(state)
});

const addMenu = { imageURL: 'icon_newdish', resizeMode: 'contain' };

class MerchantPage extends PureComponent {
  static navigationOptions = {
    tabBarIcon: 'icon_menu'
  };

  state = {
    refreshing: false
  };

  componentDidMount() {
    this.reloadData(true);
  }

  onPressItem = item => {
    if (this.props.merchant.uid === IdHelper.currentUid() || (this.props.merchant.online && item.available)) {
      this.props.setCurrentDishId(item.did);
      this.props.navigation.navigate('Dish');
    } else {
      AlertHelper.showError('Cannot order a dish when the merchant is offline or item is unvailable');
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
    const isMyMerchant = merchant.uid === IdHelper.currentUid();
    const data = isMyMerchant ? [...dishes, addMenu] : dishes;
    const styles = stylesheet.styles();
    if (!merchant.hid) {
      return <MerchantEditPage navigation={this.props.navigation} />;
    }
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
          navigation={isMyMerchant ? null : this.props.navigation}
          rightButtons={isMyMerchant ? [{ text: 'Merchant', type: 'done', onPress: () => this.props.navigation.navigate('MerchantEdit') }] : null}
        />
        <FlatList
          type="grid"
          emptyText="Empty store"
          refreshing={refreshing}
          onRefresh={this.reloadData}
          spacing={10}
          data={data}
          ListHeaderComponent={
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionText}>Menu</Text>
            </View>
          }
          renderItem={item => (
            <TouchableHighlight onPress={this.onPressItem.bind(this, item)} style={styles.touchable}>
              <View style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={item.imageURL} resizeMode={item.resizeMode} />
                </View>
                {item.name != null && <Text style={styles.name}>{item.name}</Text>}
                {item.description != null &&
                  item.description.length > 0 && (
                    <Text style={styles.info} numberOfLines={1}>
                      {item.description}
                    </Text>
                  )}
                {item.price != null && <Text style={styles.info}>{item.available ? MoneyHelper.display(item.price) : 'Unavailable'}</Text>}
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
