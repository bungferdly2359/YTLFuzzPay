import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import stylesheet from './stylesheet';
import { NavBar } from '../../components';

export default class PrivacyPage extends PureComponent {
  state = {};
  render() {
    const styles = stylesheet.styles();
    return (
      <View style={styles.container}>
        <NavBar title="Privacy Policy" navigation={this.props.navigation} />
        <Text style={styles.text}>Lorem ipsum dolor sit amet</Text>
      </View>
    );
  }
}
