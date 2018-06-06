import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';

const mapStateToProps = state => ({});

class EmptyPage extends PureComponent {
  state = {};
  render() {
    const styles = stylesheet.styles();
    return <View style={styles.container} />;
  }
}

export default connect(mapStateToProps, {})(EmptyPage);
