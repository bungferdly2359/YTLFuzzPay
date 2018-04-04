import React from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { register } from '../../../redux/api';
import { Image, Button, NavBar, Input } from '../../components';
import resources from '../../resources';
import { ValidateHelper } from '../../../helpers';

const RegisterPage = props => {
  const styles = stylesheet.styles();

  const state = {
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    bankName: '',
    bankAccount: ''
  };

  const register = () => {
    if (ValidateHelper.isValidUser(state)) {
      props.register(state).then(() => {
        props.navigation.navigate('Verify');
      });
    }
  };

  return (
    <View style={styles.container}>
      <NavBar navigation={props.navigation} title="Registration" />
      <KeyboardAvoidingView style={styles.full} behavior="padding">
        <ScrollView style={styles.full} contentContainerStyle={styles.contentContainer}>
          <Input title="First Name" placeholder="John" onChangeText={value => (state.firstName = value)} />
          <Input title="Last Name" placeholder="Smith" onChangeText={value => (state.lastName = value)} />
          <Input title="Username" placeholder="JohnSmith32" onChangeText={value => (state.username = value)} />
          <Input title="Mobile Number" keyboardType="phone-pad" placeholder="+65 12345678" onChangeText={value => (state.phoneNumber = value)} />
          <Input title="Bank Name" placeholder="UOB" onChangeText={value => (state.bankName = value)} />
          <Input title="Bank Account Number" keyboardType="phone-pad" placeholder="1231231231" onChangeText={value => (state.bankAccount = value)} />
          <Button text="Sign Up" onPress={register} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default connect(null, {
  register
})(RegisterPage);
