import React, { PureComponent } from 'react';
import { Text, View, TouchableHighlight, Linking, Alert } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Image, Button, NavBar, Input, CheckBox, Cell, SearchBar, LazyView, FlatList } from '../../components';
import { getMerchantsByHawkerId, setCurrentMerchantId } from '../../../redux/merchants';
import { getHawkerById } from '../../../redux/hawkers';
import { LocationHelper, StateHelper } from '../../../helpers';

const mapStateToProps = state => ({
  hid: state.hawkers.currentHawkerId,
  hawker: StateHelper.getCurrentHawker(state),
  merchants: state.merchants.merchantsByHawkerId[state.hawkers.currentHawkerId]
});

class HawkerPage extends PureComponent {
  state = {
    refreshing: false
  };

  componentDidMount() {
    this.reloadData(true);
  }

  onPressItem = item => {
    this.props.setCurrentMerchantId(item.mid);
    this.props.navigation.navigate('Merchant');
  };

  reloadData = silent => {
    const { hawker, merchants, hid } = this.props;
    if (!silent || merchants == null || merchants.length == 0) {
      this.setState({ refreshing: true });
    }
    if (!hawker) {
      this.props.getHawkerById(hid);
    }
    this.props
      .getMerchantsByHawkerId(hid)
      .then(() => this.setState({ refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  };

  gotoLocation = () => {
    const { hawker = {}, merchants = [] } = this.props;
    Alert.alert(null, 'Open link in google maps?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          if (hawker.mapsURL) {
            Linking.openURL(hawker.mapsURL);
          } else {
            const lat = LocationHelper.getLatitude(hawker.coords);
            const long = LocationHelper.getLongitude(hawker.coords);
            Linking.openURL(`https://www.google.com/maps/?q=${hawker.name}+${lat},${long}`);
          }
        }
      }
    ]);
  };

  render() {
    const styles = stylesheet.styles();
    const { hawker = {}, merchants = [] } = this.props;
    const { refreshing } = this.state;
    return (
      <View style={styles.container}>
        <NavBar title={hawker.name} navigation={this.props.navigation} rightButtons={hawker.coords ? [{ icon: 'icon_location', onPress: this.gotoLocation }] : null} />
        <FlatList
          emptyText="No store available"
          refreshing={refreshing}
          onRefresh={this.reloadData}
          data={merchants}
          ListHeaderComponent={<Image resizeMode="cover" style={styles.header} source={hawker.imageURL} />}
          renderItem={({ item }) => (
            <Cell disclosure onPress={this.onPressItem.bind(this, item)}>
              <Image style={styles.image} resizeMode="cover" source={item.imageURL} />
              <View style={styles.detailContainer}>
                <View style={styles.infoContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                  {item.online && <Text style={[styles.info, styles.active]}>online</Text>}
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.info}>{item.number}</Text>
                  <Text style={styles.info}>{item.tags}</Text>
                </View>
              </View>
            </Cell>
          )}
        />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  { getMerchantsByHawkerId, getHawkerById, setCurrentMerchantId }
)(HawkerPage);
