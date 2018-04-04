import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { updateDish, deleteDish } from '../../../redux/api';
import { Image, Button, NavBar, Input, Section } from '../../components';
import resources from '../../resources';
import { ValidateHelper, AlertHelper, IdHelper } from '../../../helpers';

const mapStateToProps = ({ merchants, dishes }) => ({
  merchant: merchants.merchants.find(m => m.mid === merchants.currentMid) || merchants.merchants[0],
  dish: dishes.dishes.find(d => d.did === dishes.currentDid)
});

class DishPage extends Component {
  state = {
    did: IdHelper.createId(),
    mid: (this.props.merchant || {}).mid,
    name: '',
    description: '',
    available: false,
    price: '',
    ...(this.props.dish || {})
  };

  update = () => {
    if (ValidateHelper.isValidParams(this.state)) {
      this.props.updateDish(this.state).then(() => this.props.navigation.goBack());
    }
  };

  delete = () => {
    if (ValidateHelper.isValidParams(this.state)) {
      this.props.deleteDish(this.state.did).then(() => this.props.navigation.goBack());
    }
  };

  render() {
    const styles = stylesheet.styles();
    const { name, description, price, available } = this.state;
    const isNew = this.props.dish == null;
    return (
      <View style={styles.container}>
        <NavBar navigation={this.props.navigation} title={isNew ? 'Add New Dish' : 'Update Dish'} />
        <KeyboardAvoidingView style={styles.full} behavior="padding">
          <ScrollView style={styles.full} contentContainerStyle={styles.contentContainer}>
            <Section>
              <Input title="Name" placeholder="Fish Soup" value={name} onChangeText={value => (this.state.name = value)} />
              <Input title="Description" placeholder="Enter description here" value={price} onChangeText={value => (this.state.description = value)} />
              <Input title="Price" prefix="$" keyboardType="numeric" placeholder="0.00" value={description} onChangeText={value => (this.state.price = value)} />
              <Input title="Availability" type="checkbox" value={available} onChangeValue={value => (this.state.available = value)} />
            </Section>
            <Section>
              <Button style={styles.button} text={isNew ? 'Save' : 'Update'} onPress={this.update} />
              {!isNew && <Button style={styles.button} text={'Delete'} onPress={this.delete} />}
            </Section>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default connect(mapStateToProps, {
  updateDish,
  deleteDish
})(DishPage);
