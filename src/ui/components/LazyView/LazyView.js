import React, { Component } from 'react';

export class LazyView extends Component {
  state = {
    shouldReloadChildren: false
  };

  isEqual = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) {
        return false;
      } else if (a.some((ai, i) => !this.isEqual(ai, b[i]))) {
        return false;
      }
    } else if (a != b) {
      return false;
    }
    return true;
  };

  reRender() {
    this.setState({ shouldReloadChildren: true });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.shouldReloadChildren || (nextProps.state ? !this.isEqual(nextProps.state, this.props.state) : false);
  }

  render() {
    this.state.shouldReloadChildren = false;
    return this.props.render ? this.props.render() : this.props.children;
  }
}
