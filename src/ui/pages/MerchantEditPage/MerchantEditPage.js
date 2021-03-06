import React, { PureComponent } from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { updateMyMerchant, getMyMerchant } from '../../../redux/merchants';
import { Button, NavBar, Input } from '../../components';
import { ValidateHelper, AlertHelper, IdHelper, MoneyHelper } from '../../../helpers';
import HawkerListInput from './HawkerListInput';

const mapStateToProps = ({ merchants }) => ({
  merchant: merchants.myMerchant
});

class MerchantEditPage extends PureComponent {
  state = {};

  componentDidMount() {
    this.props.getMyMerchant();
  }

  update = () => {
    const validateParams = { name: '', hawkerName: '', ...this.props.merchant, ...this.state };
    if (ValidateHelper.isValidParams(validateParams)) {
      const { mid = IdHelper.createId(), uid = IdHelper.currentUid() } = this.props.merchant;
      const params = { ...this.state, mid, uid };
      this.props.updateMyMerchant(params).then(() => {
        this.props.navigation.goBack();
        AlertHelper.showSuccess('Merchant Updated!');
      });
    }
  };

  chooseImage = () => {
    AlertHelper.showImagePicker(
      {
        width: 200,
        height: 200,
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
    const { name, imageURL, imagePath, tags, hawkerName, number, takeAwayPrice, online } = { ...this.props.merchant, ...this.state };
    const isNew = this.props.merchant.mid == null;
    return (
      <View style={styles.container}>
        <NavBar navigation={!isNew && this.props.navigation} title="Merchant" />
        <KeyboardAvoidingView style={styles.full} behavior="padding">
          <ScrollView style={styles.full} contentContainerStyle={styles.contentContainer} keyboardDismissMode="interactive" keyboardShouldPersistTaps="always">
            <Button type="primary" text={isNew ? 'Create' : 'Update'} onPress={this.update} />
            <Input title="Online" type="checkbox" value={online} onChangeValue={value => (this.state.online = value)} />
            <Input
              title="Take Away Price"
              prefix="S$"
              placeholder="0.30"
              keyboardType="numeric"
              value={MoneyHelper.display(takeAwayPrice, false)}
              onChangeText={value => (this.state.takeAwayPrice = MoneyHelper.price(value))}
            />
            <Input title="Tags" placeholder="Food, Drink, Halal, Vegetarian, etc" value={tags} onChangeText={value => (this.state.tags = value)} />
            <Input title="Store Number" placeholder="#01-01" value={number} onChangeText={value => (this.state.number = value)} />
            <Input title="Store Name" placeholder="John's Cafe" value={name} onChangeText={value => (this.state.name = value)} />
            <HawkerListInput
              value={hawkerName}
              onPressItem={(item = {}) => {
                this.state.hawkerName = item.name || '';
                this.state.hid = item.hid || '';
              }}
            />
            <Button type="plain" iconStyle={styles.image} icon={imagePath || imageURL || 'image_store'} onPress={this.chooseImage} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  { getMyMerchant, updateMyMerchant }
)(MerchantEditPage);
