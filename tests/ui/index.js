import { FSApp, FSNavigationService } from '../../src/modules/fs-foundation';
import { apiReducer } from '../../src/redux/api';
import { userReducer } from '../../src/redux/user';
import { merchantsReducer } from '../../src/redux/merchants';
import { dishesReducer } from '../../src/redux/dishes';
import { ordersReducer } from '../../src/redux/orders';
import { hawkersReducer } from '../../src/redux/hawkers';

import merchantNavigator from '../../src/ui/merchantNavigator';
import customerNavigator from '../../src/ui/customerNavigator';

import { setMockFetch } from '../../src/redux/api/baseApi';

let customer = true;

FSApp.setTestUIBundle(props => {
  props.addReducer('api', apiReducer);
  props.addReducer('orders', ordersReducer);
  props.addReducer('hawkers', hawkersReducer);
  props.addReducer('merchants', merchantsReducer);
  props.addReducer('dishes', dishesReducer);
  props.addReducer('user', userReducer);

  props.mockNativeProps({ customer });

  props.setNavigator(
    (customer ? customerNavigator : merchantNavigator)({
      // initialRouteName: 'Onboarding'
      initialRouteName: 'MainTab'
    })
  );

  setMockFetch(() => () => Promise.resolve());
});
