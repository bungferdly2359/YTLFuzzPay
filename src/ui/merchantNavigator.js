import MainNavigator from './navigators/MainNavigator';
import MainTabNavigator from './navigators/MainTabNavigator';

import InitialPage from './InitialPage';
import OnboardingPage from './pages/OnboardingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import MerchantEditPage from './pages/MerchantEditPage';
import DishOptionPage from './pages/DishOptionPage';
import DishEditPage from './pages/DishEditPage';
import ProfileEditPage from './pages/ProfileEditPage';
import MerchantPage from './pages/MerchantPage';
import OrderPage from './pages/OrderPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';

const menuNavigator = (config = {}) =>
  MainNavigator(
    {
      MenuMain: { screen: MerchantPage },
      MerchantEdit: { screen: MerchantEditPage },
      Dish: { screen: DishEditPage }
    },
    config
  );

const ordersNavigator = (config = {}) =>
  MainNavigator(
    {
      OrdersMain: { screen: OrdersPage },
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
      Menu: { screen: menuNavigator(config.menu) },
      Orders: { screen: ordersNavigator(config.orders) },
      Profile: { screen: profileNavigator(config.profile) }
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
      Login: { screen: LoginPage },
      DishOption: { screen: DishOptionPage },
      MainTab: { screen: mainTabNavigator(config.mainTabConfig) }
    },
    config
  );

export default rootNavigator;
