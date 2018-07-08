import React, { Component } from 'react';
import { View, KeyboardAvoidingView, ScrollView, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { updateDish, deleteDish } from '../../../redux/dishes';
import { Image, Button, NavBar, Input, Section } from '../../components';
import { ValidateHelper, AlertHelper, IdHelper, StateHelper, MoneyHelper } from '../../../helpers';

const mapStateToProps = state => ({
  merchant: StateHelper.getCurrentMerchant(state),
  dish: StateHelper.getCurrentDish(state)
});

class DishEditPage extends Component {
  state = {
    optionsLength: ((this.props.dish || {}).options || []).length,
    imagePath: null
  };

  dishState = {
    did: IdHelper.createId(),
    mid: (this.props.merchant || {}).mid,
    name: '',
    description: null,
    available: false,
    price: 0,
    imageURL: null,
    imagePath: null,
    ...(this.props.dish || {}),
    options: [...((this.props.dish || {}).options || [])]
  };

  componentWillUnmount() {
    AlertHelper.cleanImagePickerCache();
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  chooseImage = () => {
    AlertHelper.showImagePicker(
      {
        width: 290,
        height: 290,
        writeTempFile: false,
        cropping: true
      },
      image => {
        this.dishState.imagePath = image.path;
        this.setState({ imagePath: image.path });
      }
    );
  };

  update = () => {
    if (ValidateHelper.isValidParams(this.dishState)) {
      this.props.updateDish(this.dishState).then(() => this.props.navigation.goBack());
    }
  };

  delete = () => {
    if (ValidateHelper.isValidParams(this.dishState)) {
      this.props.deleteDish(this.dishState.did).then(() => this.props.navigation.goBack());
    }
  };

  deleteOptionIndex = index => {
    this.dishState.options.splice(index, 1);
    this.setState({ optionsLength: this.dishState.options.length });
  };

  toggleNewOption = () => {
    this.props.navigation.navigate('DishOption', {
      completion: option => {
        this.dishState.options.push(option);
        this.setState({ optionsLength: this.dishState.options.length });
      }
    });
  };

  render() {
    const styles = stylesheet.styles();
    const { name, description, price, available, imageURL, imagePath, options } = this.dishState;
    const isNew = this.props.dish == null;
    return (
      <View style={styles.container}>
        <NavBar navigation={this.props.navigation} title={isNew ? 'Add New Dish' : 'Update Dish'} />
        <KeyboardAvoidingView style={styles.full} behavior="padding">
          <ScrollView style={styles.full} contentContainerStyle={styles.contentContainer} keyboardDismissMode="interactive" keyboardShouldPersistTaps="always">
            <Image style={styles.image} resizeMode="cover" source={imagePath || imageURL}>
              <Button type="none" icon="image_edit" onPress={this.chooseImage} />
            </Image>
            <Section>
              <Input title="Name" placeholder="Fish Soup" value={name} onChangeText={value => (this.dishState.name = value)} />
              <Input title="Description" placeholder="Enter description here" value={description} onChangeText={value => (this.dishState.description = value)} />
              <Input
                title="Price"
                prefix="S$"
                keyboardType="numeric"
                placeholder="0.00"
                value={price > 0 ? MoneyHelper.display(price, false) : null}
                onChangeText={value => (this.dishState.price = MoneyHelper.price(value))}
              />
              <Input title="Availability" type="checkbox" value={available} onChangeValue={value => (this.dishState.available = value)} />
            </Section>
            <Section title="Options" action={{ text: '+Add', type: 'baritem done', onPress: this.toggleNewOption }}>
              {options.map((o, i) => (
                <Input
                  action={{ text: 'Remove', onPress: () => this.deleteOptionIndex(i) }}
                  key={i}
                  title={o.name}
                  prefix="S$"
                  keyboardType="numeric"
                  placeholder="0.00"
                  value={o.price > 0 ? MoneyHelper.display(o.price, false) : null}
                  onChangeText={value => (this.dishState.options[i].price = MoneyHelper.price(value))}
                />
              ))}
            </Section>
            <Section style={styles.buttonContainer}>
              {!isNew && <Button type="destructive" style={styles.button} text={'Delete'} onPress={this.delete} />}
              <Button type="primary" style={styles.button} text={isNew ? 'Save' : 'Update'} onPress={this.update} />
            </Section>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  {
    updateDish,
    deleteDish
  }
)(DishEditPage);
