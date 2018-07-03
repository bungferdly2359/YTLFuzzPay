import makeRequest from './baseApi';
import firebase from 'react-native-firebase';
import { urls } from '../../constants';

export const actionTypes = {
  getGeocode: 'api::request::getGeocode',
  clearError: 'api::clearError',
  start: 'api::start',
  finish: 'api::finish',
  error: 'api::error'
};

export const db = name => firebase.firestore().collection(name);

export const clearError = requestType => ({
  type: actionTypes.clearError,
  payload: { requestType }
});

export const getImageURLPromise = iid =>
  firebase
    .storage()
    .ref()
    .child(iid)
    .getDownloadURL();

export const uploadImagePromise = (iid, imagePath) =>
  imagePath
    ? firebase
        .storage()
        .ref()
        .child(iid)
        .putFile(imagePath)
    : Promise.resolve({});

export const getGeocode = (lat, long) =>
  makeRequest({
    type: actionTypes.getGeocode,
    url: urls.geocodeURL(lat, long)
  });
