const testDishId = 'Jjpbp81522998395';

export const StateHelper = {
  getCurrentHawker: state => state.hawkers.nearbyHawkers.find(h => h.hid === state.hawkers.currentHawkerId) || state.hawkers.hawkerByhawkerId[state.hawkers.currentHawkerId],
  getCurrentMerchant: state => state.merchants.merchantsByHawkerId[state.hawkers.currentHawkerId].find(m => m.mid === state.merchants.currentMerchantId),
  getCurrentDish: state => state.dishes.dishesByMerchantId[state.merchants.currentMerchantId || testDishId].find(d => d.did == (state.dishes.currentDishId || testDishId))
};
