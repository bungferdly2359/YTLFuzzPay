import React from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { verifyPhoneNumber } from '../../../redux/api';
import { Image, Button, NavBar, Input } from '../../components';
import resources from '../../resources';

const VerifyPage = props => {
  const styles = stylesheet.styles();
  const state = {
    code: ''
  };

  const verify = () => {
    props.verifyPhoneNumber(state.code).then(() => {
      props.navigation.dispatch(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'MainTab' })]
        })
      );
    });
  };

  return (
    <View style={styles.container}>
      <NavBar navigation={props.navigation} title="Verify Phone Number" />
      <KeyboardAvoidingView style={styles.full} behavior="padding">
        <ScrollView style={styles.full} contentContainerStyle={styles.contentContainer}>
          <Input keyboardType="phone-pad" title="Verification Code" placeholder="123123" onChangeText={value => (state.code = value)} />
          <Button text="Verify" onPress={verify} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default connect(null, {
  verifyPhoneNumber
})(VerifyPage);
