import React, { Component } from 'react';
import { Text, View, ScrollView, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { updateUser } from '../../../redux/user';
import { Image, Button, NavBar, Cell, Input } from '../../components';
import { colors } from '../../../constants';
import { AlertHelper } from '../../../helpers';

const mapStateToProps = ({ user }) => ({ user });

class ProfilePage extends Component {
  static navigationOptions = {
    tabBarIcon: 'icon_account'
  };

  state = {};

  chooseImage = () => {
    AlertHelper.showImagePicker(
      {
        width: 100,
        height: 100,
        writeTempFile: false,
        cropping: true
      },
      image => {
        this.setState({ photoPath: image.path });
      }
    );
  };

  update = () => {
    Keyboard.dismiss();
    this.props.updateUser(this.state).then(() => this.props.navigation.goBack());
  };

  render() {
    const styles = stylesheet.styles();
    const { displayName, email, photoURL, photoPath } = { ...this.props.user, ...this.state };
    return (
      <View style={styles.container}>
        <NavBar title="Edit Profile" navigation={this.props.navigation} />
        <ScrollView contentContainerStyle={styles.contentContainer} keyboardDismissMode="interactive">
          <Button type="plain" iconStyle={styles.image} icon={photoPath || photoURL} onPress={this.chooseImage} />
          <Input title="Display Name" placeholder="John Smith" value={displayName} onChangeText={value => (this.state.displayName = value)} />
          {/* <Input title="Email" placeholder="johnsmith@mail.com" value={email} onChangeText={value => (this.state.email = value)} /> */}
          <Button type="primary gradient" style={styles.update} text="Update" onPress={this.update} />
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  { updateUser }
)(ProfilePage);
