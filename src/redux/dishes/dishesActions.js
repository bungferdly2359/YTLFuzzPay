import { makeRequest, uploadImagePromise, db } from '../api';
import { IdHelper } from '../../helpers';

export const actionTypes = {
  updateDish: 'dishes::updateDish',
  deleteDish: 'dishes::deleteDish',
  setCurrentDishId: 'dishes::setCurrentDishId',
  getDishesByMerchantId: 'dishes::getDishesByMerchantId'
};

export const setCurrentDishId = did => ({
  type: actionTypes.setCurrentDishId,
  payload: did
});

export const getDishesByMerchantId = mid =>
  makeRequest({
    type: actionTypes.getDishesByMerchantId,
    customPayload: { mid },
    api: () =>
      db('dishes')
        .where('mid', '==', mid)
        .get()
  });

export const updateDish = ({ did, imagePath, ...params }) => {
  const customPayload = { did, ...params };
  return makeRequest({
    type: actionTypes.updateDish,
    customPayload,
    loadingText: 'Updating...',
    api: () =>
      uploadImagePromise(IdHelper.dishIid(did), imagePath).then(({ downloadURL }) => {
        const imageURL = downloadURL || params.imageURL;
        customPayload.imageURL = imageURL;
        return db('dishes')
          .doc(did)
          .set(customPayload, { merge: true });
      })
  });
};

export const deleteDish = did =>
  makeRequest({
    type: actionTypes.deleteDish,
    customPayload: { did },
    loadingText: 'Deleting...',
    api: () =>
      db('dishes')
        .doc(did)
        .delete()
  });
