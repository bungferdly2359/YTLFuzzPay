import MainNavigator from './navigators/MainNavigator';
import MainTabNavigator from './navigators/MainTabNavigator';

import OnboardingPage from './pages/OnboardingPage';
import InitialPage from './InitialPage';
import RegisterPage from './pages/RegisterPage';
import OrderPage from './pages/OrderPage';
import MenuPage from './pages/MenuPage';
import VerifyPage from './pages/VerifyPage';

const mainTabNavigator = (config = {}) =>
  MainTabNavigator(
    {
      Orders: { screen: OrderPage },
      Menu: { screen: MenuPage },
      Accounts: { screen: OrderPage }
    },
    {
      ...config
    }
  );

const rootNavigator = (config = {}) =>
  MainNavigator(
    {
      Onboarding: { screen: OnboardingPage },
      Register: { screen: RegisterPage },
      Verify: { screen: VerifyPage },
      MainTab: { screen: mainTabNavigator(config.mainTabConfig) },
      InitialPage: { screen: InitialPage }
    },
    config
  );

export default rootNavigator;
