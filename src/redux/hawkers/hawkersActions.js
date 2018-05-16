import firebase from 'react-native-firebase';
import { makeRequest } from '../api';

export const actionTypes = {
  getNearbyHawkers: 'hawkers::getNearbyHawkers',
  searchHawkers: 'hawkers::searchHawkers',
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
    api: () =>
      firebase
        .firestore()
        .collection('hawkers')
        .where('coords', '>', lesserGeopoint)
        .where('coords', '<', greaterGeopoint)
        .get()
  });
};

export const searchHawkers = keyword => dispatch => {
  // return makeRequest({
  //   type: actionTypes.searchHawkers,
  //   api: () => firebase.firestore().collection('hawkers').where('name', )
  // })
};

export const setCurrentHawkerId = hid => ({
  type: actionTypes.setCurrentHawkerId,
  payload: hid
});
