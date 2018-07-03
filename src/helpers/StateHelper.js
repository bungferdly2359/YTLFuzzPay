const testDishId = 'Jjpbp81522998395';
const emptyArray = [];

export const StateHelper = {
  getCurrentHawker: state => state.hawkers.nearbyHawkers.find(h => h.hid === state.hawkers.currentHawkerId) || state.hawkers.hawkerByhawkerId[state.hawkers.currentHawkerId],
  getCurrentMerchant: ({ merchants, hawkers }) =>
    (hawkers.currentHawkerId ? (merchants.merchantsByHawkerId[hawkers.currentHawkerId] || []).find(m => m.mid === merchants.currentMerchantId) : merchants.myMerchant) || {},
  getCurrentDish: state => StateHelper.getDishes(state).find(d => d.did == (state.dishes.currentDishId || testDishId)),
  getDishes: state => state.dishes.dishesByMerchantId[StateHelper.getCurrentMerchant(state).mid] || emptyArray,
  getCurrentRoute: ({ nav = {} }) => (nav.routes && nav.index !== undefined ? StateHelper.getCurrentRoute({ nav: nav.routes[nav.index] }) : nav)
};
