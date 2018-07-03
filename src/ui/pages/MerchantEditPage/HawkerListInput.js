import React, { PureComponent } from 'react';
import { Text, View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Cell, SearchBar, FlatList, Input } from '../../components';
import { searchHawkers, setCurrentHawkerId, clearSearchedHawkers } from '../../../redux/hawkers';

const mapStateToProps = state => ({
  searchedHawkers: state.hawkers.searchedHawkers
});

class HawkerListInput extends PureComponent {
  state = {
    value: this.props.value,
    selectedValue: this.props.value
  };

  onPressItem = item => {
    Keyboard.dismiss();
    this.state.value = item.name;
    this.state.selectedValue = item.name;
    this.props.clearSearchedHawkers();
    this.props.onPressItem(item);
  };

  onEndEditing = () => {
    this.state.value = this.state.selectedValue;
    this.props.clearSearchedHawkers();
  };

  onSearch = text => {
    text ? this.props.searchHawkers(text) : this.props.clearSearchedHawkers();
  };

  onChangeText = text => {
    this.state.value = text;
  };

  render() {
    const styles = stylesheet.styles();
    const { searchedHawkers = [] } = this.props;
    const { value } = this.state;

    return (
      <View style={styles.searchContainer}>
        <Input
          style={styles.searchInput}
          title="Hawker Centre"
          placeholder="Ayer Rajah Food Centre"
          stateValue={value}
          onChangeText={this.onChangeText}
          onSearch={this.onSearch}
          onEndEditing={this.onEndEditing}
        />
        <View>
          {searchedHawkers.length > 0 && (
            <FlatList
              style={[styles.searchList, { height: searchedHawkers.length * 35 }]}
              data={searchedHawkers}
              renderItem={({ item }) => (
                <Cell style={styles.searchCell} contentContainerStyle={styles.searchContentCell} onPress={this.onPressItem.bind(this, item)}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.location}>{item.address}</Text>
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
  { searchHawkers, clearSearchedHawkers }
)(HawkerListInput);
