import React from 'react';
import { Text, View } from 'react-native';
import { FSApp } from '../../../modules/fs-foundation';
import stylesheet from './stylesheet';
import { Image, Button } from '../../components';
import resources from '../../resources';

export default props => {
  const styles = stylesheet.styles();
  return (
    <View style={styles.container}>
      <Image style={styles.image} source="image_onboarding" />
      <Text style={styles.detail}>
        {FSApp.getNativeProps('customer')
          ? 'Imagine the future where the ease of ordering from the hawkers is just at the touch of your mobile phone? Just collect your food when your phone buzzes. Add to that future scenario, the possibility of going cashless at the hawkers? Use fuzzpay and make the future possible today.'
          : "Imagine the future where your customers order from you at the touch of their mobile phone? You know your orders in advance. Prepare your food and buzz the customer's phone to self-collect food. Add to that future scenario, the possibility of going cashless at the hawkers? Use fuzzpay and make the future possible today."}
      </Text>
      <Button style={styles.register} type="primary" text="Register" onPress={() => props.navigation.navigate('Register')} />
      {/* <Text style={styles.login}>Already have an account? Login</Text> */}
    </View>
  );
};
