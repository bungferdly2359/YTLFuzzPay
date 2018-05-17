export const actionTypes = {
  setCurrentDishId: 'dishes::setCurrentDishId'
};

export const setCurrentDishId = did => ({
  type: actionTypes.setCurrentDishId,
  payload: did
});
