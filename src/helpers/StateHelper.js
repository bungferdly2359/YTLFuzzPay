const testDishId = 'Jjpbp81522998395';

export const StateHelper = {
  getCurrentHawker: state => state.hawkers.nearbyHawkers.find(h => h.hid === state.hawkers.currentHawkerId) || state.hawkers.hawkerByhawkerId[state.hawkers.currentHawkerId],
  getCurrentMerchant: ({ merchants, hawkers }) =>
    hawkers.currentHawkerId ? merchants.merchantsByHawkerId[hawkers.currentHawkerId].find(m => m.mid === merchants.currentMerchantId) : merchants.myMerchant,
  getCurrentDish: ({ dishes, merchants }) => dishes.dishesByMerchantId[merchants.currentMerchantId || testDishId].find(d => d.did == (dishes.currentDishId || testDishId)),
  getDishes: ({ merchants, dishes }) => (merchants.currentMerchantId ? dishes.dishesByMerchantId[merchants.currentMerchantId] : dishes.dishes)
};
