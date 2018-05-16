import React, { PureComponent } from 'react';
import { View, LayoutAnimation } from 'react-native';
import { Button, InputText } from '../';
import stylesheet from './stylesheet';

export class SearchBar extends PureComponent {
  lastText = null;

  componentDidUpdate() {
    LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.easeInEaseOut, duration: 200 });
  }

  onChangeText = text => {
    let { onSearch } = this.props;
    if (!onSearch) {
      return;
    }
    this.lastText = text;
    setTimeout(() => {
      if (text.length > 2 && this.lastText === text) {
        this.props.onSearch(text);
      }
    }, 400);
  };

  render() {
    const { searching, onToggleSearch } = this.props;
    const styles = stylesheet.styles();
    return (
      <View style={[styles.container, searching && styles.containerSearching]}>
        <View style={[styles.inputContainer, searching && styles.inputContainerSearching]}>
          <Button
            icon="icon_search"
            type="barItem"
            style={[styles.button, searching && styles.buttonSearching]}
            iconStyle={searching ? styles.iconSearching : styles.icon}
            onPress={onToggleSearch}
          />
          {searching && <InputText placeholder="Search" autoFocus inputStyle={[styles.input, searching && styles.inputSearching]} onChangeText={this.onChangeText} />}
        </View>
        <Button disabled={!searching} type="barItem" text="cancel" textStyle={[styles.cancel, searching && styles.cancelSearching]} onPress={onToggleSearch} />
      </View>
    );
  }
}
