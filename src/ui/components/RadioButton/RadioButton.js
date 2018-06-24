import React, { Component } from 'react';
import { Button } from '../';
import stylesheet from './stylesheet';

export class RadioButton extends Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { value } = this.props;
    const styles = stylesheet.styles();
    return <Button type="none" icon={value ? 'icon_radiobutton1' : 'icon_radiobutton0'} {...this.props} iconStyle={styles.icon} />;
  }
}
