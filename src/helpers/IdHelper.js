import firebase from 'react-native-firebase';
import moment from 'moment';

let uid = null;
firebase.auth().onAuthStateChanged(u => (uid = (firebase.auth().currentUser || {}).uid));

export const IdHelper = {
  createId: () => `${uid.substring(0, 6)}${moment().unix()}`,
  dishIid: did => `dishes/${did}.jpg`,
  merchantId: mid => `merchants/${mid}.jpg`,
  currentUid: () => uid
};
