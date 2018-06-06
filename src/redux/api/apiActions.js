import baseApi from './baseApi';
import firebase from 'react-native-firebase';
import { IdHelper, OrderHelper } from '../../helpers';
import { urls } from '../../constants';

export const actionTypes = {
  register: 'api::request::register',
  updateOrderStatus: 'api::request::updateOrderStatus',
  updateDish: 'api::request::updateDish',
  deleteDish: 'api::request::deleteDish',
  getDishes: 'api::request::getDishes',
  getUser: 'api::request::getUser',
  updateUser: 'api::request::updateUser',
  verifyPhoneNumber: 'api::request::verifyPhoneNumber',
  getGeocode: 'api::request::getGeocode',
  clearError: 'api::clearError',
  start: 'api::start',
  finish: 'api::finish',
  error: 'api::error'
};

let confirmResult = null;
const db = name => firebase.firestore().collection(name);

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

export const getDishes = mid =>
  baseApi({
    type: actionTypes.getDishes,
    api: () =>
      db('dishes')
        .where('mid', '==', mid)
        .get()
  });

export const updateDish = ({ did, imagePath, ...params }) => {
  const customPayload = { did, ...params };
  return baseApi({
    type: actionTypes.updateDish,
    customPayload,
    loadingText: 'Updating...',
    api: () =>
      uploadImagePromise(IdHelper.dishIid(did), imagePath).then(({ downloadURL }) => {
        const imageURL = downloadURL || params.imageURL;
        customPayload.imageURL = imageURL;
        return db('dishes')
          .doc(did)
          .set({ ...params, imageURL });
      })
  });
};

export const deleteDish = did =>
  baseApi({
    type: actionTypes.deleteDish,
    customPayload: did,
    loadingText: 'Deleting...',
    api: () =>
      db('dishes')
        .doc(did)
        .delete()
  });

export const getUser = () =>
  baseApi({
    type: actionTypes.getUser,
    api: () =>
      db('users')
        .doc(IdHelper.currentUid())
        .get()
  });

export const updateUser = params =>
  baseApi({
    type: actionTypes.updateUser,
    customPayload: params,
    loadingText: 'Updating...',
    api: () =>
      db('users')
        .doc(IdHelper.currentUid())
        .set(params)
  });

export const register = params =>
  baseApi({
    type: actionTypes.register,
    customPayload: params,
    loadingText: 'Registering...',
    api: () =>
      firebase
        .auth()
        .signInWithPhoneNumber(params.phoneNumber)
        .then(r => {
          confirmResult = r;
          return r;
        })
  });

export const verifyPhoneNumber = verificationCode =>
  baseApi({
    type: actionTypes.verifyPhoneNumber,
    api: () => confirmResult.confirm(verificationCode),
    loadingText: 'Verifying...'
  });

export const getGeocode = (lat, long) =>
  baseApi({
    type: actionTypes.getGeocode,
    url: urls.geocodeURL(lat, long)
  });
