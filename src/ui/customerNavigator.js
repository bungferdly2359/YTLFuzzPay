import MainNavigator from './navigators/MainNavigator';
import MainTabNavigator from './navigators/MainTabNavigator';

import OnboardingPage from './pages/OnboardingPage';
import InitialPage from './InitialPage';
import RegisterPage from './pages/RegisterPage';
import VerifyPage from './pages/VerifyPage';
import HawkersPage from './customerPages/HawkersPage';
import HawkerPage from './customerPages/HawkerPage';
import MerchantPage from './customerPages/MerchantPage';
import DishOrderPage from './customerPages/DishOrderPage';
import CartPage from './customerPages/CartPage';

const hawkerNavigator = (config = {}) =>
  MainNavigator(
    {
      HawkersMain: { screen: HawkersPage },
      Hawker: { screen: HawkerPage },
      Merchant: { screen: MerchantPage }
    },
    config
  );

const cartNavigator = (config = {}) =>
  MainNavigator(
    {
      CartMain: { screen: CartPage }
    },
    config
  );

const mainTabNavigator = (config = {}) =>
  MainTabNavigator(
    {
      Hawkers: { screen: hawkerNavigator(config.hawkersConfig) },
      Cart: { screen: cartNavigator(config.cartConfig) }
    },
    {
      ...config
    }
  );

const rootNavigator = (config = {}) =>
  MainNavigator(
    {
      InitialPage: { screen: InitialPage },
      Onboarding: { screen: OnboardingPage },
      Register: { screen: RegisterPage },
      Verify: { screen: VerifyPage },
      MainTab: { screen: mainTabNavigator(config.mainTabConfig) },
      DishOrder: { screen: DishOrderPage }
    },
    config
  );

export default rootNavigator;
