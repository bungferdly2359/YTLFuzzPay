import React from 'react';
import { Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { Image, Button } from '../../components';
import { signInWithFacebook, signInWithGoogle } from '../../../redux/user';
import { UserHelper } from '../../../helpers';

const OnboardingPage = props => {
  const styles = stylesheet.styles();
  const gotoMain = () => {
    props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'MainTab' })]
      })
    );
  };
  const isCustomer = UserHelper.isCustomer();
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" style={styles.image} source="image_onboarding" />
      <Text style={styles.detail}>
        {isCustomer
          ? 'Imagine the future where the ease of ordering from the hawkers is just at the touch of your mobile phone? Just collect your food when your phone buzzes. Add to that future scenario, the possibility of going cashless at the hawkers? Use fuzzpay and make the future possible today.'
          : "Imagine the future where your customers order from you at the touch of their mobile phone? You know your orders in advance. Prepare your food and buzz the customer's phone to self-collect food. Add to that future scenario, the possibility of going cashless at the hawkers? Use fuzzpay and make the future possible today."}
      </Text>
      {isCustomer && <Button style={styles.fbButton} type="primary" gradient={false} text="Sign in with Facebook" onPress={() => props.signInWithFacebook().then(gotoMain)} />}
      {isCustomer && <Button style={styles.googleButton} type="primary" gradient={false} text="Sign in with Google" onPress={() => props.signInWithGoogle().then(gotoMain)} />}
      {!isCustomer && <Button style={styles.register} type="primary" text="Register" onPress={() => props.navigation.navigate('Register')} />}
      {!isCustomer && (
        <Text style={styles.login} onPress={() => props.navigation.navigate('Login')}>
          Already have an account? Login
        </Text>
      )}
    </View>
  );
};

export default connect(
  null,
  { signInWithFacebook, signInWithGoogle }
)(OnboardingPage);
