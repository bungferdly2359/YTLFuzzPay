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
  response = getResponseData(response);
  if (response.message) {
    return response.message;
  }
  return null;
};

const getResponseData = r => {
  if (!r) {
    return null;
  }
  var response = r;
  if (response.data && typeof response.data != 'function') {
    response = response.data;
  }
  return response;
};

export const setMockFetch = (mf = (props = {}) => {}) => {
  mockFetch = mf;
};

export const defaultFetch = props => (dispatch, getState) => {
  const { type, loadingText, errorType, api, customPayload, auth } = props;

  const state = getState();
  const method = props.method || (props.body ? 'POST' : 'GET');
  const data = props.body;
  const url = props.url; //.startsWith('http') ? props.url : `${URLHelper.getCurrentBaseURL()}${props.url}`;
  const timeout = 10000;
  const headers = props.headers || {};

  dispatch({
    type: actionTypes.start,
    requestType: type,
    payload: {
      loadingText,
      errorType: errorType || (loadingText && 'alert'),
      errorMessage: null
    }
  });

  return ((api && api()) || axios.request({ url, auth, method, headers, data, timeout }))
    .then(resp => {
      if (getErrorMessage(resp)) {
        throw response;
      }
      let response = getResponseData(resp);
      console.log({
        result: 'success',
        props,
        resp
      });
      dispatch({
        type: actionTypes.finish,
        requestType: type,
        payload: {
          loadingText: null
        }
      });
      dispatch({
        type,
        payload: {
          response,
          customPayload
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
        type: actionTypes.error,
        requestType: type,
        payload: {
          loadingText: null,
          errorMessage
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
