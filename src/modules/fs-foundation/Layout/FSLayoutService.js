import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { FSLayoutActions, FSStyleSheet } from './';
import { FSApp } from '../';

const mapStateToProps = (state) => (state.layout);
const { setAppDimension } = FSLayoutActions;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -999
  }
});

class CTLayoutService extends Component {
  
  shouldComponentUpdate() {
    return false;
  }
  
  onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    if (this.props.appDimension.width !== width || this.props.appDimension.height !== height) {
      FSStyleSheet.setAppDimension({ width, height });
      this.props.setAppDimension({ width, height });
    }
  }
  
  render() {
    return (
      <View style={styles.container} pointerEvents='none' onLayout={this.onLayout} />
    );
  }
}

const service = connect(mapStateToProps, { setAppDimension })(CTLayoutService);
FSApp.addService(service);
export default service;
