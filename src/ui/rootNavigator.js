import MainNavigator from './navigators/MainNavigator';
import MainTabNavigator from './navigators/MainTabNavigator';

import OnboardingPage from './pages/OnboardingPage';
import InitialPage from './InitialPage';
import RegisterPage from './pages/RegisterPage';
import OrderPage from './pages/OrderPage';
import MenuPage from './pages/MenuPage';
import VerifyPage from './pages/VerifyPage';
import ProfilePage from './pages/ProfilePage';

const mainTabNavigator = (config = {}) =>
  MainTabNavigator(
    {
      Orders: { screen: OrderPage },
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
      Verify: { screen: VerifyPage },
      MainTab: { screen: mainTabNavigator(config.mainTabConfig) }
    },
    config
  );

export default rootNavigator;
