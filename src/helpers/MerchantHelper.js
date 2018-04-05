export const MerchantHelper = {
  currentMerchant: mState => mState.merchants.find(m => m.mid === mState.currentMid) || mState.merchants[0]
};
