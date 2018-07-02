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
    email: '',
    password: ''
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
      <KeyboardAvoidingView style={styles.full} behavior="padding">
        <ScrollView style={styles.full} contentContainerStyle={styles.contentContainer}>
          <Input title="Email" keyboardType="email-address" placeholder="your@email.com" onChangeText={value => (state.email = value)} />
          <Input title="Password" secureTextEntry={true} onChangeText={value => (state.password = value)} />
          <Button text="Sign Up" onPress={register} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default connect(
  null,
  { register }
)(RegisterPage);
