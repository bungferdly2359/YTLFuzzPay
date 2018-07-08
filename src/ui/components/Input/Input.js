import React, { Component } from 'react';
import { Text, View } from 'react-native';
import InputText from './Input.text';
import stylesheet from './stylesheet';
import { CheckBox, Button } from '..';

const inputFields = {
  text: { Element: InputText, line: true },
  checkbox: { Element: CheckBox, row: true }
};

export class Input extends Component {

  state = {
    focus: false
  }

  onFocus = (event) => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    this.setState({ focus: true });
  }
  
  onEndEditing = (event) => {
    if (this.props.onEndEditing) {
      this.props.onEndEditing(event);
    }
    this.setState({ focus: false });
  }

  render() {
    const { 
      type = 'text',
      prefix,
      style, 
      action,
      titleStyle,
      ...otherProps,
    } = this.props;
    const { focus } = this.state;
    const styles = stylesheet.styles();
    const { Element, line, row } = inputFields[type];
    return (
      <View style={[styles.container, line && styles.bottomLine, line && focus && styles.focusBottomLine, row && styles.rowContainer, style]}>
        <View style={styles.titleContainer}>
          {otherProps.title != null && <Text style={[styles.title, focus && styles.focusTitle, row && styles.rowTitle, titleStyle]}>{otherProps.title}</Text>}
          {action && <Button type='baritem done' {...action} />}
        </View>
        <View style={styles.inputContainer}> 
          {prefix != null && <Text style={[styles.detailText, styles.prefix]}>{prefix}</Text>}
          <Element {...otherProps} onFocus={this.onFocus} onEndEditing={this.onEndEditing} />
        </View>
      </View>
    );
  }
}
