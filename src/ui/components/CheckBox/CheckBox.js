import React, { Component } from 'react';
import { Button } from '../';
import stylesheet from './stylesheet';

export class CheckBox extends Component {
  state = {
    value: this.props.value || false
  };

  shouldComponentUpdate() {
    return true;
  }

  toggleIndex = () => {
    const value = !this.state.value;
    this.setState({ value });
    if (this.props.onChangeValue) {
      this.props.onChangeValue(value);
    }
  };

  render() {
    const { value } = this.state;
    const styles = stylesheet.styles();
    return <Button type="none" icon={value ? 'icon_checkbox1' : 'icon_checkbox0'} {...this.props} iconStyle={styles.icon} onPress={() => this.toggleIndex()} />;
  }
}
