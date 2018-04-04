import React, { Component } from 'react';
import { Text, View } from 'react-native';
import InputText from './Input.text';
import stylesheet from './stylesheet';

const inputFields = {
  text: { Element: InputText, line: true }
};

export class Input extends Component {

  state = {
    focus: false
  }

  onFocus = (event) => {
    this.setState({ focus: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }
  
  onEndEditing = (event) => {
    this.setState({ focus: false });
    if (this.props.onEndEditing) {
      this.props.onEndEditing(event);
    }
  }

  render() {
    const { 
      type = 'text',
      prefix,
      style, 
      titleStyle,
      ...otherProps,
    } = this.props;
    const { focus } = this.state;
    const styles = stylesheet.styles();
    const { Element, line } = inputFields[type];
    return (
      <View style={[styles.container, line && styles.bottomLine, line && focus && styles.focusBottomLine, style]}>
        {otherProps.title != null && <Text style={[styles.title, focus && styles.focusTitle, titleStyle]}>{otherProps.title}</Text>}
        {prefix != null && 
          <View style={styles.inputContainer}> 
            <Text style={[styles.detailText, styles.prefix]}>{prefix}</Text>
            <Element {...otherProps} onFocus={this.onFocus} onEndEditing={this.onEndEditing} />
          </View>
        }
        {prefix == null && <Element {...otherProps} onFocus={this.onFocus} onEndEditing={this.onEndEditing} />}
      </View>
    );
  }
}
