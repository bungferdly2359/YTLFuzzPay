import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { updateUser, getUser } from '../../../redux/api';
import { Image, Button, NavBar, Input } from '../../components';
import resources from '../../resources';
import { ValidateHelper, AlertHelper } from '../../../helpers';

const mapStateToProps = ({ user }) => ({ user });

class ProfilePage extends Component {
  static navigationOptions = {
    tabBarIcon: 'icon_account'
  };

  state = { ...this.props.user };

  componentDidMount() {
    this.props.getUser();
  }

  update = () => {
    const { fullName, bankName, bankAccount, userName } = this.state;
    const params = { fullName, bankName, bankAccount, userName };
    if (ValidateHelper.isValidUser(params)) {
      this.props.updateUser(params).then(() => AlertHelper.showSuccess('Profile Updated!'));
    }
  };

  render() {
    const styles = stylesheet.styles();
    const { fullName, phoneNumber, bankName, bankAccount, userName } = this.state;
    return (
      <View style={styles.container}>
        <NavBar title="Profile" />
        <KeyboardAvoidingView style={styles.full} behavior="padding">
          <ScrollView style={styles.full} contentContainerStyle={styles.contentContainer}>
            <Input title="Full Name" placeholder="John Smith" value={fullName} onChangeText={value => (this.state.fullName = value)} />
            <Input title="User Name" placeholder="JohnSmith123" value={userName} onChangeText={value => (this.state.userName = value)} />
            <Input title="Mobile Number" keyboardType="phone-pad" placeholder="+65 12345678" value={phoneNumber} editable={false} />
            <Input title="Bank Name" placeholder="UOB" value={bankName} onChangeText={value => (this.state.bankName = value)} />
            <Input title="Bank Account Number" keyboardType="phone-pad" placeholder="1231231231" value={bankAccount} onChangeText={value => (this.state.bankAccount = value)} />
            <Button text="Update" onPress={this.update} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default connect(mapStateToProps, {
  updateUser,
  getUser
})(ProfilePage);
