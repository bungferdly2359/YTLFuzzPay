import React from 'react';
import { View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { login } from '../../../redux/user';
import { Button, NavBar, Input } from '../../components';
import { ValidateHelper } from '../../../helpers';
import { getMyMerchant } from '../../../redux/merchants';

const LoginPage = props => {
  const styles = stylesheet.styles();

  const state = {
    email: '',
    password: ''
  };

  const login = () => {
    if (ValidateHelper.isValidParams(state)) {
      props
        .login(state)
        .then(props.getMyMerchant)
        .then(() => {
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
      <NavBar navigation={props.navigation} title="Login" />
      <KeyboardAvoidingView style={styles.full} behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="interactive" style={styles.full} contentContainerStyle={styles.contentContainer}>
          <Input title="Email" keyboardType="email-address" placeholder="your@email.com" onChangeText={value => (state.email = value)} />
          <Input title="Password" secureTextEntry={true} onChangeText={value => (state.password = value)} />
          <Button text="Sign In" type="primary" onPress={login} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default connect(
  null,
  {
    getMyMerchant,
    login
  }
)(LoginPage);
