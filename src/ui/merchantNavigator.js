import MainNavigator from './navigators/MainNavigator';
import MainTabNavigator from './navigators/MainTabNavigator';

import OnboardingPage from './pages/OnboardingPage';
import InitialPage from './InitialPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import MerchantEditPage from './pages/MerchantEditPage';
import DishOptionPage from './pages/DishOptionPage';
import DishEditPage from './pages/DishEditPage';
import ProfileEditPage from './pages/ProfileEditPage';
import MerchantPage from './pages/MerchantPage';

const mainTabNavigator = (config = {}) =>
  MainTabNavigator(
    {
      Menu: { screen: MerchantPage },
      Orders: { screen: OrdersPage },
      Profile: { screen: ProfilePage }
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
      MerchantEdit: { screen: MerchantEditPage },
      Dish: { screen: DishEditPage },
      DishOption: { screen: DishOptionPage },
      ProfileSetup: { screen: ProfileEditPage },
      ProfileEdit: { screen: ProfileEditPage },
      MainTab: { screen: mainTabNavigator(config.mainTabConfig) }
    },
    config
  );

export default rootNavigator;
