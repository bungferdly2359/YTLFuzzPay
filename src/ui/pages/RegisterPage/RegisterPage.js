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
    phoneNumber: ''
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
          <Input prefix="+65" title="Mobile Number" keyboardType="phone-pad" placeholder="12345678" onChangeText={value => (state.phoneNumber = `+65${value}`)} />
          <Button text="Sign Up" onPress={register} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default connect(null, {
  register
})(RegisterPage);
