import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { updateUser, getUser, logout } from '../../../redux/user';
import { Image, Button, NavBar, Input } from '../../components';
import resources from '../../resources';
import { ValidateHelper, AlertHelper } from '../../../helpers';

const mapStateToProps = ({ user }) => ({ user });

class ProfilePage extends Component {
  static navigationOptions = {
    tabBarIcon: 'icon_account'
  };

  state = {};

  componentDidMount() {
    this.props.getUser();
  }

  update = () => {
    const { fullName, bankName, bankAccount } = this.state;
    const params = { fullName, bankName, bankAccount };
    if (ValidateHelper.isValidParams(params)) {
      this.props.updateUser(params).then(() => AlertHelper.showSuccess('Profile Updated!'));
    }
  };

  render() {
    const styles = stylesheet.styles();
    const { fullName, bankName, bankAccount } = { ...this.props.user, ...this.state };
    return (
      <View style={styles.container}>
        <NavBar
          title="Profile"
          rightButtons={[
            {
              text: 'Sign Out',
              type: 'done',
              onPress: () => {
                this.props.logout().then(() => {
                  this.props.navigation.dispatch(
                    NavigationActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'Onboarding' })]
                    })
                  );
                });
              }
            }
          ]}
        />
        <KeyboardAvoidingView style={styles.full} behavior="padding">
          <ScrollView style={styles.full} contentContainerStyle={styles.contentContainer}>
            <Input title="Full Naaaa" placeholder="John Smith" value={fullName} onChangeText={value => (this.state.fullName = value)} />
            <Input title="Bank Name" placeholder="UOB" value={bankName} onChangeText={value => (this.state.bankName = value)} />
            <Input title="Bank Account Number" keyboardType="phone-pad" placeholder="1231231231" value={bankAccount} onChangeText={value => (this.state.bankAccount = value)} />
            <Button text="Update" onPress={this.update} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  {
    updateUser,
    getUser,
    logout
  }
)(ProfilePage);
