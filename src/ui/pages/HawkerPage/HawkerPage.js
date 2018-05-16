import React, { PureComponent } from 'react';
import { Text, View, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Image, Button, NavBar, Input, CheckBox, Cell, SearchBar, LazyView } from '../../components';
import { getMerchantsByHawkerId } from '../../../redux/merchants';

const mapStateToProps = state => ({
  hawker: state.hawkers.hawkers.find(h => h.hid === state.hawkers.currentHawkerId),
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
    const { hawker, merchants } = this.props;
    if (!silent || merchants == null) {
      this.setState({ refreshing: true });
    }
    this.props
      .getMerchantsByHawkerId(hawker.id)
      .then(() => this.setState({ refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  };

  render() {
    const styles = stylesheet.styles();
    const { hawker, merchants = [] } = this.props;
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
              <Image style={styles.image} resizeMode="cover" source={item.thumbnailURL} />
              <View style={styles.detailContainer}>
                <Text style={styles.title}>{item.name}</Text>
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

export default connect(mapStateToProps, { getMerchantsByHawkerId })(HawkerPage);
