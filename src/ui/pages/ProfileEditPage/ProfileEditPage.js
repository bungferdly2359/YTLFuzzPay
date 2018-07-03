import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { updateUser } from '../../../redux/user';
import { Button, NavBar, Input } from '../../components';
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
        width: 200,
        height: 200,
        writeTempFile: false,
        cropping: true
      },
      image => {
        this.setState({ photoPath: image.path });
      }
    );
  };

  update = () => {
    this.props.updateUser(this.state).then(() => this.props.navigation.goBack());
  };

  render() {
    const styles = stylesheet.styles();
    const { displayName, photoURL, photoPath } = { ...this.props.user, ...this.state };
    return (
      <View style={styles.container}>
        <NavBar title="Edit Profile" navigation={this.props.navigation.state.routeName == 'ProfileEdit' && this.props.navigation} />
        <ScrollView contentContainerStyle={styles.contentContainer} keyboardDismissMode="interactive" keyboardShouldPersistTaps="always">
          <Button type="plain" iconStyle={styles.image} icon={photoPath || photoURL || 'image_profile'} onPress={this.chooseImage} />
          <Input title="Display Name" placeholder="John Smith" value={displayName} onChangeText={value => (this.state.displayName = value)} />
          <Button type="primary" style={styles.update} text="Update" onPress={this.update} />
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  { updateUser }
)(ProfilePage);
