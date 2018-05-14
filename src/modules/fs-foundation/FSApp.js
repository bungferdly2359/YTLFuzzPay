import React, { Component } from 'react';
import { View, StatusBar, AsyncStorage, UIManager, AppRegistry, Platform } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getStoredState, createPersistor } from 'redux-persist';
import { FSLayoutService, FSLayoutReducer } from './Layout';
import { FSNavigationService, FSNavigationReducer, FSNavigationProps } from './Navigation';

const appProps = {
  nativeProps: {},
  appBundle: null,
  testUIBundle: null,
  appName: null,
  reducers: { nav: FSNavigationReducer, layout: FSLayoutReducer },
  whitelistReducerKeys: [],
  services: [FSLayoutService, FSNavigationService]
};

class FSApp extends Component {
  state = {};

  componentWillMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    appProps.nativeProps = this.props;

    let prefix = '';
    if (appProps.testUIBundle && this.props.testUI) {
      prefix = 'testUI::';
      appProps.testUIBundle({ ...FSAppProps, ...this.props });
    } else if (appProps.appBundle) {
      appProps.appBundle({ ...FSAppProps, ...this.props });
    }

    const persistConfig = { storage: AsyncStorage, whitelist: appProps.whitelistReducerKeys, keyPrefix: prefix };
    const middlewares = [ReduxThunk];
    getStoredState(persistConfig, (err, restoredState) => {
      const store = createStore(combineReducers(appProps.reducers), restoredState, composeWithDevTools(applyMiddleware(...middlewares)));
      const persistor = createPersistor(store, persistConfig);
      this.setState({ store, persistor });
    });
  }

  render() {
    const { store, persistor } = this.state;
    const { services } = appProps;
    if (store == null) {
      return <View />;
    }
    return (
      <Provider store={store} persistor={persistor}>
        <View style={appProps.appStyle || { flex: 1, backgroundColor: 'black' }}>{services.map((Service, i) => <Service key={i} />)}</View>
      </Provider>
    );
  }
}

const FSAppProps = {
  addService: service => {
    appProps.services.push(service);
  },

  addReducer: (key, reducer, options = { whitelist: false }) => {
    appProps.reducers[key] = reducer;
    if (options.whitelist) {
      appProps.whitelistReducerKeys.push(key);
    }
  },

  setNavigator: navigator => {
    FSNavigationProps.setNavigator(navigator);
  },

  mockNativeProps: props => {
    appProps.nativeProps = { ...appProps.nativeProps, ...props };
  }
};

const FSAppCollector = {
  getNativeProps: key => appProps.nativeProps[key],

  setAppBundle: (appName, appBundle) => {
    appProps.appBundle = appBundle;
    appProps.appName = appName;
    AppRegistry.registerComponent(appName, () => FSApp);
  },

  setTestUIBundle: testUIBundle => {
    appProps.testUIBundle = testUIBundle;
  }
};

export { FSAppCollector as FSApp };
