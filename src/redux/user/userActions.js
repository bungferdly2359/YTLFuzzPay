import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import { getGeocode, makeRequest } from '../api';

export const actionTypes = {
  updateData: 'user::updateData',
  signInWithFacebook: 'user::signInWithFacebook',
  signInWithGoogle: 'user::signInWithGoogle'
};

export const updateData = data => ({
  type: actionTypes.updateData,
  payload: data
});

export const getCurrentLocation = () => dispatch =>
  new Promise((resolve, reject) => {
    this.navigator.geolocation.requestAuthorization();
    this.navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        dispatch(getGeocode(coords.latitude, coords.longitude))
          .then(geocode => {
            if (geocode) {
              const findValueWithType = type => geocode.results.findMap(item => item.address_components.findMap(addr => ~addr.types.indexOf(type) && addr.long_name));
              const address = ['route', 'neighborhood', 'political', 'locality'].findMap(findValueWithType);
              const result = {
                latitude: coords.latitude,
                longitude: coords.longitude,
                description: address
              };
              dispatch(updateData({ currentLocation: result }));
              resolve(result);
            }
            reject('No Geocode found');
          })
          .catch(error => {
            reject(error);
          });
      },
      error => {
        reject(error);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  });

export const signInWithFacebook = () =>
  makeRequest({
    type: actionTypes.signInWithFacebook,
    loadingText: 'Signing in...',
    api: () =>
      LoginManager.logInWithReadPermissions(['public_profile', 'email'])
        .then(res => {
          if (res.isCancelled) {
            throw new Error('Sign in cancelled');
          }
          console.log(`Login success with permissions: ${res.grantedPermissions.toString()}`);
          return AccessToken.getCurrentAccessToken();
        })
        .then(data => {
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
          return firebase.auth().signInAndRetrieveDataWithCredential(credential);
        })
  });

export const signInWithGoogle = () =>
  makeRequest({
    type: actionTypes.signInWithGoogle,
    loadingText: 'Signing in...',
    api: () =>
      GoogleSignin.configure({ iosClientId: '721775440052-h0bjalbvr972o1rpebh47g7de6sjhrji.apps.googleusercontent.com' })
        .then(() => GoogleSignin.signIn())
        .then(data => {
          const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
          return firebase.auth().signInAndRetrieveDataWithCredential(credential);
        })
  });
