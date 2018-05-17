import React, { PureComponent } from 'react';
import { Text, View, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Image, Button, NavBar, Input, CheckBox, Cell, SearchBar, LazyView } from '../../components';
import { getMerchantsByHawkerId } from '../../../redux/merchants';
import { getHawkerById } from '../../../redux/hawkers';

const mapStateToProps = state => ({
  hid: state.hawkers.currentHawkerId,
  hawker: state.hawkers.nearbyHawkers.find(h => h.hid === state.hawkers.currentHawkerId) || state.hawkers.hawkerByhawkerId[state.hawkers.currentHawkerId],
  merchants: state.merchants.merchantsByHawkerId[state.hawkers.currentHawkerId]
});

class HawkerPage extends PureComponent {
  state = {
    refreshing: false
  };

  componentDidMount() {
    this.reloadData(true);
  }

  onPressItem = item => {};

  reloadData = silent => {
    const { hawker, merchants, hid } = this.props;
    if (!silent || merchants == null) {
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

  render() {
    const styles = stylesheet.styles();
    const { hawker = {}, merchants = [] } = this.props;
    const { refreshing } = this.state;
    return (
      <View style={styles.container}>
        <NavBar title={hawker.name} navigation={this.props.navigation} />
        <FlatList
          keyExtractor={(item, i) => i.toString()}
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
                  {item.online && <Text style={[styles.info, styles.active]}>active</Text>}
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

export default connect(mapStateToProps, { getMerchantsByHawkerId, getHawkerById })(HawkerPage);
