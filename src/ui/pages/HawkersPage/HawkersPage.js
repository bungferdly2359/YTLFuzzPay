import React, { PureComponent } from 'react';
import { Text, View, FlatList, TouchableHighlight, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Image, Button, NavBar, Input, CheckBox, Cell, SearchBar } from '../../components';
import { getCurrentLocation } from '../../../redux/user';
import { getNearbyHawkers } from '../../../redux/hawkers';
import { LocationHelper } from '../../../helpers';

const empty = [];

const mapStateToProps = state => ({
  currentLocation: state.user.currentLocation,
  hawkers: state.hawkers.hawkers,
  searchedHawkers: empty
});

class HawkersPage extends PureComponent {
  static navigationOptions = {
    tabBarIcon: 'icon_hawkers'
  };

  state = {
    refreshing: false,
    searching: false
  };

  itemOnPress = item => {};

  componentDidMount() {
    if (!this.props.currentLocation) {
      this.reloadData();
    }
  }

  onToggleSearch = () => {
    this.setState({ searching: !this.state.searching });
  };

  onSearch = text => {
    console.log(text);
  };

  reloadData = () => {
    this.setState({ refreshing: true });
    this.props
      .getCurrentLocation()
      .then(result => this.props.getNearbyHawkers(result.latitude, result.longitude))
      .then(() => this.setState({ refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  };

  render() {
    const styles = stylesheet.styles();
    const { currentLocation = {}, hawkers, searchedHawkers } = this.props;
    const { searching, refreshing } = this.state;
    const data = searching ? searchedHawkers : hawkers;
    return (
      <View style={styles.container}>
        <NavBar title="Hawker Centres">
          <Button type="sheet" text={refreshing ? 'Reload Data...' : `Your Location : ${currentLocation.description || 'Unknown'}`} onPress={this.reloadData} />
        </NavBar>
        <SearchBar onToggleSearch={this.onToggleSearch} onSearch={this.onSearch} searching={searching} />
        <FlatList
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item, i) => i.toString()}
          data={data}
          renderItem={({ item }) => (
            <Cell disclosure onPress={() => {}}>
              <Image style={styles.image} resizeMode="cover" source={item.imageURL} />
              <View style={styles.detailContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.location}>{item.address}</Text>
                <View style={styles.distanceContainer}>
                  <Image source="icon_distance" />
                  <Text style={styles.distance}>{LocationHelper.getDistance(currentLocation, item.coords).toFixed(2)}km away</Text>
                </View>
              </View>
            </Cell>
          )}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, { getCurrentLocation, getNearbyHawkers })(HawkersPage);
