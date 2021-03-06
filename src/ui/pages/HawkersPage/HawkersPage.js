import React, { PureComponent } from 'react';
import { Text, View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Image, Button, NavBar, Input, CheckBox, Cell, SearchBar, LazyView, FlatList } from '../../components';
import { getCurrentLocation } from '../../../redux/user';
import { getNearbyHawkers, searchHawkers, setCurrentHawkerId, clearSearchedHawkers } from '../../../redux/hawkers';
import { LocationHelper } from '../../../helpers';

const mapStateToProps = state => ({
  currentLocation: state.user.currentLocation,
  hawkers: state.hawkers.nearbyHawkers,
  searchedHawkers: state.hawkers.searchedHawkers
});

class HawkersPage extends PureComponent {
  static navigationOptions = {
    tabBarIcon: 'icon_hawkers'
  };

  state = {
    refreshing: false,
    searching: false
  };

  componentDidMount() {
    if (!this.props.currentLocation) {
      this.reloadData();
    }
  }

  onPressItem = item => {
    Keyboard.dismiss();
    this.props.setCurrentHawkerId(item.hid);
    this.props.navigation.navigate('Hawker');
  };

  onToggleSearch = () => {
    if (this.state.searching) {
      this.props.clearSearchedHawkers();
    }
    this.setState({ searching: !this.state.searching });
  };

  onSearch = text => {
    text ? this.props.searchHawkers(text) : this.props.clearSearchedHawkers();
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
    const { currentLocation = {}, hawkers = [], searchedHawkers } = this.props;
    const { searching, refreshing, error } = this.state;
    return (
      <View style={styles.container}>
        <NavBar title="Hawker Centres">
          <SearchBar onToggleSearch={this.onToggleSearch} onSearch={this.onSearch} searching={searching} />
        </NavBar>
        <View style={styles.container}>
          <LazyView
            state={[refreshing, hawkers.map(h => h.hid)]}
            render={() => (
              <FlatList
                style={styles.searchList}
                emptyText="No hawker near you :("
                refreshing={refreshing}
                onRefresh={this.reloadData}
                data={hawkers}
                ListHeaderComponent={
                  <Button
                    style={styles.header}
                    type="sheet gradient"
                    text={refreshing ? 'Reload Data...' : `Your Location : ${currentLocation.description || 'Unknown'}`}
                    onPress={this.reloadData}
                  />
                }
                renderItem={({ item }) => (
                  <Cell disclosure onPress={this.onPressItem.bind(this, item)}>
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
            )}
          />
          {searching && (
            <FlatList
              style={styles.searchList}
              data={searchedHawkers}
              renderItem={({ item }) => (
                <Cell onPress={this.onPressItem.bind(this, item)}>
                  <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.location}>{item.address}</Text>
                  </View>
                </Cell>
              )}
            />
          )}
        </View>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  { getCurrentLocation, getNearbyHawkers, searchHawkers, setCurrentHawkerId, clearSearchedHawkers }
)(HawkersPage);
