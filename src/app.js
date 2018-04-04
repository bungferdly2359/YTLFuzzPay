import { FSApp, FSNavigationService } from './modules/fs-foundation';
import rootNavigator from './ui/rootNavigator';
import { apiReducer } from './redux/api';
import RequestService from './services/RequestService';
import { userReducer } from './redux/user';
import { merchantsReducer } from './redux/merchants';
import { dishesReducer } from './redux/dishes';

FSApp.setAppBundle('YTLFuzzPay', () => {
  //setup reducers
  FSApp.addReducer('api', apiReducer);
  FSApp.addReducer('merchants', merchantsReducer, { whitelist: true });
  FSApp.addReducer('dishes', dishesReducer, { whitelist: true });
  FSApp.addReducer('user', userReducer, { whitelist: true });

  //setup services
  FSApp.addService(RequestService);

  //setup root navigator
  FSNavigationService.setNavigator(rootNavigator());
});
