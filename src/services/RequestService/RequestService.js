import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Keyboard } from 'react-native';
import { clearError } from '../../redux/api';
import stylesheet from './stylesheet';
import { AlertHelper } from '../../helpers';

const mapStateToProps = state => ({
  loadingRequest: state.api.requests.find(r => r.loadingText) || null,
  errorRequest: state.api.requests.find(r => r.errorMessage) || null
});

class RequestService extends Component {
  componentDidUpdate() {
    this.handleError();
  }

  handleError = () => {
    const { errorRequest } = this.props;
    if (errorRequest) {
      if (errorRequest.errorType === 'alert') {
        AlertHelper.showError(errorRequest.errorMessage);
      }
      this.props.clearError({ requestType: errorRequest.type });
    }
  };

  handleLoading = () => {
    const { loadingRequest } = this.props;
    if (loadingRequest) {
      Keyboard.dismiss();
      return stylesheet.render(styles => (
        <View style={styles.container}>
          <View style={styles.loadingContainer}>
            <Text style={styles.text}>{loadingRequest.loadingText}</Text>
          </View>
        </View>
      ));
    }
    return null;
  };

  render() {
    return this.handleLoading();
  }
}

export default connect(
  mapStateToProps,
  { clearError }
)(RequestService);
