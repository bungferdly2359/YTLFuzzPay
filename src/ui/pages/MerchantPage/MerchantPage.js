import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { updateMerchant } from '../../../redux/api';
import { Image, Button, NavBar, Input, Section } from '../../components';
import resources from '../../resources';
import { ValidateHelper, AlertHelper, IdHelper } from '../../../helpers';

const mapStateToProps = ({ merchants }) => ({
  merchant: merchants.merchants.find(m => m.mid === merchants.currentMid) || merchants.merchants[0]
});

class MerchantPage extends Component {
  state = { location: '', type: '', name: '', mid: IdHelper.createId(), uid: IdHelper.currentUid(), imageURL: '', imagePath: '', ...(this.props.merchant || {}) };

  update = () => {
    if (ValidateHelper.isValidParams(this.state)) {
      this.props.updateMerchant(this.state).then(() => AlertHelper.showSuccess('Merchant Updated!'));
    }
  };

  chooseImage = () => {
    AlertHelper.showImagePicker(
      {
        width: 290,
        height: 290,
        writeTempFile: false,
        cropping: true
      },
      image => {
        this.setState({ imagePath: image.path });
      }
    );
  };

  render() {
    const styles = stylesheet.styles();
    const { name, imageURL, imagePath, type, location } = this.state;
    const isNew = this.props.merchant == null;
    return (
      <View style={styles.container}>
        <NavBar navigation={!isNew && this.props.navigation} title="Merchant" />
        <Image style={styles.image} resizeMode="cover" source={imagePath || imageURL}>
          <Button type="none" icon="image_edit" onPress={this.chooseImage} />
        </Image>
        <KeyboardAvoidingView style={styles.full} behavior="padding">
          <ScrollView style={styles.full} contentContainerStyle={styles.contentContainer}>
            <Input title="Merchant Name" placeholder="John's Cafe" value={name} onChangeText={value => (this.state.name = value)} />
            <Input title="Type" placeholder="Food, Drink or Dessert" value={type} onChangeText={value => (this.state.type = value)} />
            <Input title="Hawker Centre" placeholder="Ayer Rajah Food Centre" value={location} onChangeText={value => (this.state.location = value)} />
            <Button text={isNew ? 'Create' : 'Update'} onPress={this.update} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default connect(mapStateToProps, {
  updateMerchant
})(MerchantPage);
