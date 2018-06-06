import React, { Component } from 'react';
import { Text, View, FlatList, TouchableHighlight, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Image, Button, NavBar, Input, CheckBox, Cell, SearchBar, LazyView } from '../../components';
import { getCurrentLocation } from '../../../redux/user';
import { getNearbyHawkers, searchHawkers, setCurrentHawkerId, clearSearchedHawkers } from '../../../redux/hawkers';
import { LocationHelper } from '../../../helpers';

const mapStateToProps = state => ({});

class HawkersMasterPage extends Component {
  render() {
    const styles = stylesheet.styles();
    return (
      <View style={styles.container}>
        {this.props.children}
        <Button type="primary gradient" text="some text" />
      </View>
    );
  }
}

export default connect(mapStateToProps, {})(HawkersMasterPage);
