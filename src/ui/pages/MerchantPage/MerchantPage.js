import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { updateMerchant } from '../../../redux/api';
import { Image, Button, NavBar, Input } from '../../components';
import resources from '../../resources';
import { ValidateHelper, AlertHelper, IdHelper } from '../../../helpers';

const mapStateToProps = ({ merchants }) => ({
  merchant: merchants.merchants.find(m => m.mid === merchants.currentMid) || merchants.merchants[0]
});

class MerchantPage extends Component {
  state = { name: '', mid: IdHelper.createId(), uid: IdHelper.currentUid(), ...(this.props.merchant || {}) };

  update = () => {
    if (ValidateHelper.isValidParams(this.state)) {
      this.props.updateMerchant(this.state).then(() => AlertHelper.showSuccess('Merchant Updated!'));
    }
  };

  render() {
    const styles = stylesheet.styles();
    const { name } = this.state;
    const isNew = this.props.merchant == null;
    return (
      <View style={styles.container}>
        <NavBar navigation={!isNew && this.props.navigation} title="Merchant" />
        <KeyboardAvoidingView style={styles.full} behavior="padding">
          <ScrollView style={styles.full} contentContainerStyle={styles.contentContainer}>
            <Input title="Merchant Name" placeholder="John's Cafe" value={name} onChangeText={value => (this.state.name = value)} />
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
