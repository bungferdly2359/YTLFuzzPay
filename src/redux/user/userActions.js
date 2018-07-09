import { Platform } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import { getGeocode, makeRequest, uploadImagePromise } from '../api';
import { IdHelper, AlertHelper } from '../../helpers';

export const actionTypes = {
  updateData: 'user::updateData',
  signInWithFacebook: 'user::signInWithFacebook',
  signInWithGoogle: 'user::signInWithGoogle',
  getUser: 'user::getUser',
  updateUser: 'user::updateUser',
  register: 'user::register',
  login: 'user::login',
  logout: 'user::logout'
};

export const updateData = data => ({
  type: actionTypes.updateData,
  payload: data
});

export const getCurrentLocation = () => dispatch =>
  new Promise((resolve, reject) => {
    if (Platform.OS == 'ios') {
      this.navigator.geolocation.requestAuthorization();
    }
    this.navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        console.log(coords);
        dispatch(getGeocode(coords.latitude, coords.longitude))
          .then(geocode => {
            console.log(geocode);
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
            console.log('error get geocode: ', error);
            reject(error);
          });
      },
      error => {
        console.log('error get location: ', error);
        reject(error);
      },
      { enableHighAccuracy: false, timeout: 20000 }
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
      GoogleSignin.configure({
        iosClientId: '721775440052-h0bjalbvr972o1rpebh47g7de6sjhrji.apps.googleusercontent.com',
        webClientId: '721775440052-an1a7r1qn815qj744jmnedjivecaod2h.apps.googleusercontent.com'
      })
        .then(() => GoogleSignin.signIn())
        .then(data => {
          const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
          return firebase.auth().signInAndRetrieveDataWithCredential(credential);
        })
  });

export const getUser = () =>
  makeRequest({
    type: actionTypes.getUser,
    api: () =>
      firebase
        .firestore()
        .collection('users')
        .doc(IdHelper.currentUid())
        .get()
  });

export const updateUser = ({ photoPath, ...params }) => {
  const customPayload = { ...params };
  return makeRequest({
    type: actionTypes.updateUser,
    customPayload,
    loadingText: 'Updating...',
    api: () =>
      uploadImagePromise(IdHelper.userIid(), photoPath).then(({ downloadURL }) => {
        if (downloadURL) {
          customPayload.photoURL = downloadURL;
        }
        return firebase
          .firestore()
          .collection('users')
          .doc(IdHelper.currentUid())
          .set(customPayload, { merge: true });
      })
  });
};

export const register = params =>
  makeRequest({
    type: actionTypes.register,
    customPayload: params,
    loadingText: 'Registering...',
    api: () => firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(params.email, params.password)
  });

export const login = params =>
  makeRequest({
    type: actionTypes.login,
    customPayload: params,
    loadingText: 'Signing in...',
    api: () => firebase.auth().signInAndRetrieveDataWithEmailAndPassword(params.email, params.password)
  });

export const logout = () =>
  makeRequest({
    type: actionTypes.logout,
    loadingText: 'Signing out...',
    api: () => firebase.auth().signOut()
  });
