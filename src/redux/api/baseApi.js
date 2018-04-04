import axios from 'axios';
// import { URLHelper } from '../../helpers';
import firebase from 'react-native-firebase';
import { actionTypes } from './apiActions';
import { config } from '../../constants';

const getErrorMessage = response => {
  if (response.message || response.status < 200 || response.status >= 400) {
    const responseJSON = response.data || response;
    const defaultErrorMessage = 'Service unavailable. Please try again later.';
    let errorMessage =
      (responseJSON[0] || {}).message || responseJSON.message || (responseJSON.errorMessages || [])[0] || response.statusText || defaultErrorMessage;
    if (~errorMessage.indexOf('exceeded')) {
      errorMessage = defaultErrorMessage;
    }
    return errorMessage;
  }
};

export default props => (dispatch, getState) => {
  const { type, loadingText, errorType, customPayload } = props;

  const state = getState();
  const method = props.method || (props.body ? 'POST' : 'GET');
  const headers = {
    'x-access-token': state.user.token,
    'Content-Type': 'application/json',
    ...(props.headers || [])
  };
  const data = props.body;
  const url = props.url; //.startsWith('http') ? props.url : `${URLHelper.getCurrentBaseURL()}${props.url}`;
  const timeout = 10000;

  dispatch({
    type,
    requestType: actionTypes.loadingOf(type),
    payload: {
      loadingText,
      errorType: errorType || (loadingText && 'alert'),
      errorMessage: null,
      customPayload
    }
  });

  return axios
    .request({ url, method, headers, data, timeout })
    .then(response => {
      if (getErrorMessage(response)) {
        throw response;
      }
      const responseJSON = response.data || { status: response.status };
      console.log({
        result: 'success',
        url: response.config.url,
        response
      });
      dispatch({
        type,
        requestType: actionTypes.successOf(type),
        payload: {
          response: responseJSON,
          customPayload,
          loadingText: null
        }
      });
      return responseJSON;
    })
    .catch(response => {
      const errorMessage = getErrorMessage(((response || {}).response || {}).data || response);
      console.log({
        result: 'failed',
        url: response.config.url,
        response
      });
      dispatch({
        type,
        requestType: actionTypes.failedOf(type),
        payload: {
          errorMessage,
          customPayload,
          loadingText: null
        }
      });
      throw new Error(errorMessage);
    });
};
