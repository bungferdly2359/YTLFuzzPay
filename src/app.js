import { FSApp, FSNavigationService } from './modules/fs-foundation';
import rootNavigator from './ui/rootNavigator';
import { apiReducer } from './redux/api';


FSApp.setAppBundle('YTLFuzzPay', () => {
  //setup reducers
  FSApp.addReducer('api', apiReducer);

  //setup services

  //setup root navigator
  FSNavigationService.setNavigator(rootNavigator());
});
