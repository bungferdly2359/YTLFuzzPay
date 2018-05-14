import axios from 'axios';
// import { URLHelper } from '../../helpers';
import firebase from 'react-native-firebase';
import { actionTypes } from './apiActions';
import { config } from '../../constants';

let mockFetch = null;

const getErrorMessage = r => {
  if (!r) {
    return null;
  }
  var response = r;
  if (response.response) {
    response = response.response;
  }
  if (response.data) {
    response = response.data;
  }
  if (response.message) {
    return response.message;
  }
  return null;
};

export const setMockFetch = (mf = (props = {}) => {}) => {
  mockFetch = mf;
};

export const defaultFetch = props => (dispatch, getState) => {
  const { type, loadingText, errorType, api, customPayload } = props;

  const state = getState();
  const method = props.method || (props.body ? 'POST' : 'GET');
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

  return ((api && api()) || axios.request({ url, method, headers, data, timeout }))
    .then(response => {
      if (getErrorMessage(response)) {
        throw response;
      }
      console.log({
        result: 'success',
        props,
        response
      });
      dispatch({
        type,
        requestType: actionTypes.successOf(type),
        payload: {
          response,
          customPayload,
          loadingText: null
        }
      });
      return response;
    })
    .catch(response => {
      const errorMessage = getErrorMessage(response);
      console.log({
        result: 'failed',
        props,
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

export default (props = {}) => (dispatch, getState) => {
  if (mockFetch) {
    return dispatch(mockFetch(props));
  } else {
    return dispatch(defaultFetch(props));
  }
};
