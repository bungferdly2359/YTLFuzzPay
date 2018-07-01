import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import stylesheet from './stylesheet';
import { NavBar } from '../../components';

export default class AboutPage extends PureComponent {
  state = {};
  render() {
    const styles = stylesheet.styles();
    return (
      <View style={styles.container}>
        <NavBar title="About" navigation={this.props.navigation} />
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet {'\n\n'}
          Current Version : {DeviceInfo.getVersion()}
        </Text>
      </View>
    );
  }
}
