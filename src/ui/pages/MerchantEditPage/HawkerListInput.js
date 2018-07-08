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
    selectedValue: this.props.value,
    searching: false
  };

  onPressItem = item => {
    Keyboard.dismiss();
    this.props.onPressItem(item);
    this.setState({ value: item.name, selectedValue: item.name, searching: false });
    this.props.clearSearchedHawkers();
  };

  onEndEditing = () => {
    if (this.state.value != this.state.selectedValue) {
      this.setState({ value: null, selectedValue: null, searching: false });
    }
    this.props.clearSearchedHawkers();
  };

  onFocus = () => {
    this.setState({ searching: true });
  };

  onSearch = text => {
    if (text) {
      this.props.searchHawkers(text);
    } else {
      this.props.clearSearchedHawkers();
    }
  };

  onChangeText = text => {
    this.state.value = text;
    this.props.onPressItem();
  };

  render() {
    const styles = stylesheet.styles();
    const { searchedHawkers = [] } = this.props;
    const { value, searching } = this.state;

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
          onFocus={this.onFocus}
        />
        <View>
          {searching &&
            searchedHawkers.length > 0 && (
              <FlatList
                style={[styles.searchList, { height: Math.min(searchedHawkers.length, 5) * 35 }]}
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
