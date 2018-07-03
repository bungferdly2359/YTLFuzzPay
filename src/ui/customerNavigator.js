import MainNavigator from './navigators/MainNavigator';
import MainTabNavigator from './navigators/MainTabNavigator';

import OnboardingPage from './pages/OnboardingPage';
import InitialPage from './InitialPage';
import RegisterPage from './pages/RegisterPage';
import HawkersPage from './pages/HawkersPage';
import HawkerPage from './pages/HawkerPage';
import MerchantPage from './pages/MerchantPage';
import DishOrderPage from './pages/DishOrderPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
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
      Order: { screen: OrderPage }
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
      Dish: { screen: DishOrderPage }
    },
    config
  );

export default rootNavigator;
