import React from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { registerWithPhoneNumber } from '../../../redux/api';
import { Image, Button, NavBar, Input } from '../../components';
import resources from '../../resources';

const RegisterPage = props => {
  const styles = stylesheet.styles();

  const register = () => {
    props.registerWithPhoneNumber('+6587092880').then(() => {
      props.navigation.navigate('Verify');
    });
  };

  return (
    <View style={styles.container}>
      <NavBar navigation={props.navigation} title="Registration" />
      <KeyboardAvoidingView style={styles.full} behavior="padding">
        <ScrollView style={styles.full} contentContainerStyle={styles.contentContainer}>
          <Input title="First Name" placeholder="John" />
          <Input title="Last Name" placeholder="Smith" />
          <Input title="Username" placeholder="JohnSmith32" />
          <Input title="Mobile Number" placeholder="+65 912345678" />
          <Input title="Bank Account Number" placeholder="123-123-123-1" />
          <Button text="Sign Up" onPress={register} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default connect(null, {
  registerWithPhoneNumber
})(RegisterPage);
