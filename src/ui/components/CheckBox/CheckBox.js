import React, { Component } from 'react';
import { Button } from '../';
import stylesheet from './stylesheet';

export class CheckBox extends Component {
  state = {
    selected: this.props.selected
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.selected !== nextProps.selected) {
      this.setState({ selected: !this.state.selected });
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  toggleIndex = () => {
    this.setState({ selected: !this.state.selected });
    if (this.props.onValueChanged) {
      this.props.onValueChanged(this.state.selected);
    }
  };

  render() {
    const { style, text, textStyle } = this.props;
    const { selected } = this.state;
    return <Button type="none" icon={selected ? 'icon_checkbox1' : 'icon_checkbox0'} style={style} onPress={() => this.toggleIndex()} />;
  }
}
