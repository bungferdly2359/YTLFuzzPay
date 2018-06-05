import firebase from 'react-native-firebase';
import { makeRequest } from '../api';

export const actionTypes = {
  getNearbyHawkers: 'hawkers::getNearbyHawkers',
  getHawkerById: 'hawkers::getHawkerById',
  searchHawkers: 'hawkers::searchHawkers',
  clearSearchedHawkers: 'hawkers::clearSearchedHawkers',
  setCurrentHawkerId: 'hawkers::setCurrentHawkerId'
};

export const getNearbyHawkers = (latitude, longitude) => {
  const lat = 0.003;
  const lon = 0.006;
  const lowerLat = latitude - lat;
  const lowerLon = longitude - lon;
  const greaterLat = latitude + lat;
  const greaterLon = longitude + lon;
  const lesserGeopoint = new firebase.firestore.GeoPoint(lowerLat, lowerLon);
  const greaterGeopoint = new firebase.firestore.GeoPoint(greaterLat, greaterLon);
  return makeRequest({
    type: actionTypes.getNearbyHawkers,
    errorType: 'alert',
    api: () =>
      firebase
        .firestore()
        .collection('hawkers')
        // .where('coords', '>', lesserGeopoint)
        // .where('coords', '<', greaterGeopoint)
        .get()
  });
};

export const searchHawkers = keyword =>
  makeRequest({
    type: actionTypes.searchHawkers,
    url: 'http://35.197.128.204//elasticsearch/hawkers/_search',
    body: {
      query: {
        match: {
          name: keyword
        }
      }
    },
    auth: {
      username: 'user',
      password: 'fCQnF9szJqvH'
    },
    errorType: 'alert'
  });

export const getHawkerById = hid =>
  makeRequest({
    type: actionTypes.getHawkerById,
    errorType: 'alert',
    api: () =>
      firebase
        .firestore()
        .collection('hawkers')
        .doc(hid)
        .get()
  });

export const clearSearchedHawkers = () => ({
  type: actionTypes.clearSearchedHawkers
});

export const setCurrentHawkerId = hid => ({
  type: actionTypes.setCurrentHawkerId,
  payload: hid
});
