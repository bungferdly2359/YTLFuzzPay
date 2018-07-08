import React, { PureComponent } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import stylesheet from './stylesheet';

export default class TextInput extends PureComponent {
  state = {
    height: 60
  };

  lastText = null;

  onChangeText = text => {
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
    if (this.props.onSearch) {
      this.lastText = text;
      setTimeout(() => {
        if (this.lastText === text) {
          this.props.onSearch(text.length > 2 ? text : null);
        }
      }, 400);
    }
  };

  render() {
    const { value, stateValue, inputStyle, autogrow, ...otherProps } = this.props;
    const styles = stylesheet.styles();

    return (
      <RNTextInput
        style={[styles.detailText, inputStyle, autogrow && { padding: 10, height: this.state.height }]}
        autoCorrect={false}
        value={stateValue}
        defaultValue={value}
        maxLength={200}
        onContentSizeChange={autogrow ? e => this.setState({ height: Math.max(e.nativeEvent.contentSize.height + 20, 60) }) : undefined}
        underlineColorAndroid="transparent"
        {...otherProps}
        onChangeText={this.onChangeText}
      />
    );
  }
}
