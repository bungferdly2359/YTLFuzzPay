import React, { PureComponent } from 'react';
import { Text, View, FlatList, TouchableHighlight, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Image, Button, NavBar, Input, CheckBox, Cell, SearchBar } from '../../components';

const mapStateToProps = state => ({});

class HawkersPage extends PureComponent {
  static navigationOptions = {
    tabBarIcon: 'icon_hawkers'
  };

  state = {
    refreshing: false,
    searching: false,
    data: [1, 2, 3, 4, 5]
  };

  itemOnPress = item => {
    // this.props.setCurrentDid(item.did);
    // this.props.navigation.navigate('Dish');
  };

  componentDidMount() {
    // this.props.getMerchants().then(() => this.props.merchant && this.props.getDishes(this.props.merchant.mid));
  }

  onToggleSearch = () => {
    this.setState({ searching: !this.state.searching });
  };

  onSearch = text => {
    console.log(text);
  };

  reloadData() {}

  render() {
    const styles = stylesheet.styles();
    const { searching, refreshing } = this.state;
    const data = searching ? [] : this.state.data;
    return (
      <View style={styles.container}>
        <NavBar title="Hawker Centres">
          <Button type="sheet" text="Your Location : Bukit Panjang" />
        </NavBar>
        <SearchBar onToggleSearch={this.onToggleSearch} onSearch={this.onSearch} searching={searching} />
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.reloadData} />}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item, i) => i.toString()}
          data={data}
          renderItem={({ item }) => {
            return (
              <Cell disclosure onPress={() => {}}>
                <Image style={styles.image} />
                <View style={styles.detailContainer}>
                  <Text style={styles.title}>Golden Mile Food Centre</Text>
                  <Text style={styles.location}>505 Beach Road</Text>
                  <View style={styles.distanceContainer}>
                    <Image source="icon_distance" />
                    <Text style={styles.distance}>2km away</Text>
                  </View>
                </View>
              </Cell>
            );
          }}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, {})(HawkersPage);
