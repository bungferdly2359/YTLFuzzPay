import React, { Component } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import stylesheet from './stylesheet';

export default class TextInput extends Component {
  state = {
    height: 60
  };

  render() {
    const { value, inputStyle, autogrow, ...otherProps } = this.props;
    const styles = stylesheet.styles();
    return (
      <RNTextInput
        style={[styles.detailText, inputStyle, autogrow && { padding: 10, height: this.state.height }]}
        autoCorrect={false}
        defaultValue={value}
        maxLength={200}
        onContentSizeChange={autogrow ? e => this.setState({ height: Math.max(e.nativeEvent.contentSize.height + 20, 60) }) : undefined}
        {...otherProps}
      />
    );
  }
}
