import { FSApp, FSNavigationService } from './modules/fs-foundation';
import merchantNavigator from './ui/merchantNavigator';
import customerNavigator from './ui/customerNavigator';
import { apiReducer } from './redux/api';
import RequestService from './services/RequestService';
import { userReducer } from './redux/user';
import { merchantsReducer } from './redux/merchants';
import { dishesReducer } from './redux/dishes';
import { ordersReducer } from './redux/orders';

FSApp.setAppBundle('YTLFuzzPay', () => {
  //setup reducers
  FSApp.addReducer('api', apiReducer);
  FSApp.addReducer('orders', ordersReducer);
  FSApp.addReducer('merchants', merchantsReducer, { whitelist: true });
  FSApp.addReducer('dishes', dishesReducer, { whitelist: true });
  FSApp.addReducer('user', userReducer, { whitelist: true });

  //setup services
  FSApp.addService(RequestService);

  //setup root navigator
  if (FSApp.appProps.nativeProps.isCustomer) {
    FSNavigationService.setNavigator(customerNavigator());
  } else {
    FSNavigationService.setNavigator(merchantNavigator());
  }
});
