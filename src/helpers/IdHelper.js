import firebase from 'react-native-firebase';
import moment from 'moment';

let uid = null;
firebase.auth().onAuthStateChanged(u => (uid = firebase.auth().currentUser.uid));

export const IdHelper = {
  currentUid: () => uid,
  createId: () => `${uid.substring(0, 6)}${moment().unix()}`
};
