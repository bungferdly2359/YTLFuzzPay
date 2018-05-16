import React, { Component } from 'react';

export class LazyView extends Component {
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

  shouldComponentUpdate(nextProps) {
    return nextProps.state && !this.isEqual(nextProps.state, this.props.state);
  }

  render() {
    return this.props.children;
  }
}
