import React from 'react';
import { View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { register } from '../../../redux/user';
import { Button, NavBar, Input } from '../../components';
import { ValidateHelper } from '../../../helpers';

const RegisterPage = props => {
  const styles = stylesheet.styles();

  const state = {
    email: '',
    password: '',
    repeatPassword: ''
  };

  const register = () => {
    if (ValidateHelper.isValidParams(state)) {
      props.register(state).then(() => {
        props.navigation.dispatch(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainTab' })]
          })
        );
      });
    }
  };

  return (
    <View style={styles.container}>
      <NavBar navigation={props.navigation} title="Registration" />
      <KeyboardAvoidingView style={styles.full} behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.full} keyboardDismissMode="interactive" contentContainerStyle={styles.contentContainer}>
          <Input title="Email" keyboardType="email-address" placeholder="your@email.com" onChangeText={value => (state.email = value)} />
          <Input title="Password" secureTextEntry={true} onChangeText={value => (state.password = value)} />
          <Input title="Repeat Password" secureTextEntry={true} onChangeText={value => (state.repeatPassword = value)} />
          <Button text="Sign Up" type="primary" onPress={register} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default connect(
  null,
  { register }
)(RegisterPage);
