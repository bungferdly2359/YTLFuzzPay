import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import stylesheet from './stylesheet';
import { Button, Input } from '../../components';
import { ValidateHelper } from '../../../helpers';

export default class DishOptionPage extends Component {
  newOption = {
    name: '',
    price: ''
  };

  addNewOption = () => {
    if (ValidateHelper.isValidParams(this.newOption)) {
      this.props.navigation.state.params.completion(this.newOption);
      this.goBack();
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const styles = stylesheet.styles();
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.contentContainer}>
          <Input title="Name" placeholder="Extra chili" value={this.newOption.name} onChangeText={value => (this.newOption.name = value)} />
          <Input title="Price" prefix="S$" keyboardType="numeric" placeholder="0.00" value={this.newOption.price} onChangeText={value => (this.newOption.price = value)} />
          <View style={styles.buttonContainer}>
            <Button type="primary gradient" style={styles.button} text="Cancel" onPress={this.goBack} />}
            <Button type="primary gradient" style={styles.button} text="Add" onPress={this.addNewOption} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
