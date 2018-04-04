export const actionTypes = {
  setCurrentDid: 'dishes::setCurrentDid'
};

export const setCurrentDid = did => ({
  type: actionTypes.setCurrentDid,
  payload: did
});
