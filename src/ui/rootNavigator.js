import MainNavigator from './navigators/MainNavigator';
import MainTabNavigator from './navigators/MainTabNavigator';

import OnboardingPage from './pages/OnboardingPage';
import InitialPage from './InitialPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';
import MenuPage from './pages/MenuPage';
import VerifyPage from './pages/VerifyPage';
import ProfilePage from './pages/ProfilePage';
import MerchantPage from './pages/MerchantPage';
import DishPage from './pages/DishPage/DishPage';

const mainTabNavigator = (config = {}) =>
  MainTabNavigator(
    {
      Orders: { screen: OrdersPage },
      Menu: { screen: MenuPage },
      Accounts: { screen: ProfilePage }
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
      Merchant: { screen: MerchantPage },
      Dish: { screen: DishPage },
      Verify: { screen: VerifyPage },
      MainTab: { screen: mainTabNavigator(config.mainTabConfig) }
    },
    config
  );

export default rootNavigator;
