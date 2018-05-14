import { FSApp } from './modules/fs-foundation';
import merchantNavigator from './ui/merchantNavigator';
import customerNavigator from './ui/customerNavigator';
import { apiReducer } from './redux/api';
import RequestService from './services/RequestService';
import { userReducer } from './redux/user';
import { merchantsReducer } from './redux/merchants';
import { dishesReducer } from './redux/dishes';
import { ordersReducer } from './redux/orders';

FSApp.setAppBundle('YTLFuzzPay', props => {
  props.addReducer('api', apiReducer);
  props.addReducer('orders', ordersReducer);
  props.addReducer('merchants', merchantsReducer, { whitelist: true });
  props.addReducer('dishes', dishesReducer, { whitelist: true });
  props.addReducer('user', userReducer, { whitelist: true });

  props.addService(RequestService);

  props.setNavigator(props.customer ? customerNavigator() : merchantNavigator());
});
