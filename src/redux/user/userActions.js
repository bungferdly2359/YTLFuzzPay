export const actionTypes = {
  updateData: 'user::updateData'
};

export const updateData = (data) => ({
  type: actionTypes.updateData,
  payload: data
});
