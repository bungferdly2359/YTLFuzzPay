import MainNavigator from './navigators/MainNavigator';
import MainTabNavigator from './navigators/MainTabNavigator';

import OnboardingPage from './pages/OnboardingPage';
import InitialPage from './InitialPage';
import RegisterPage from './pages/RegisterPage';
import HawkersPage from './customerPages/HawkersPage';
import HawkerPage from './customerPages/HawkerPage';
import MerchantPage from './customerPages/MerchantPage';
import DishOrderPage from './customerPages/DishOrderPage';
import CartPage from './customerPages/CartPage';
import CheckoutPage from './customerPages/CheckoutPage';
import OrdersPage from './customerPages/OrdersPage/OrdersPage';
import OrderDetailsPage from './customerPages/OrderDetailsPage';
import ProfilePage from './customerPages/ProfilePage';
import ProfileEditPage from './customerPages/ProfileEditPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';

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
      CartMain: { screen: CartPage },
      Checkout: { screen: CheckoutPage }
    },
    config
  );

const ordersNavigator = (config = {}) =>
  MainNavigator(
    {
      OrderMain: { screen: OrdersPage },
      OrderDetails: { screen: OrderDetailsPage }
    },
    config
  );

const profileNavigator = (config = {}) =>
  MainNavigator(
    {
      ProfileMain: { screen: ProfilePage },
      ProfileEdit: { screen: ProfileEditPage },
      About: { screen: AboutPage },
      Privacy: { screen: PrivacyPage }
    },
    config
  );

const mainTabNavigator = (config = {}) =>
  MainTabNavigator(
    {
      Hawkers: { screen: hawkerNavigator(config.hawkersConfig) },
      Cart: { screen: cartNavigator(config.cartConfig) },
      Orders: { screen: ordersNavigator(config.ordersConfig) },
      Profile: { screen: profileNavigator(config.profileConfig) }
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
      MainTab: { screen: mainTabNavigator(config.mainTabConfig) },
      DishOrder: { screen: DishOrderPage }
    },
    config
  );

export default rootNavigator;
