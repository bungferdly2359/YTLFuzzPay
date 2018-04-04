import React, { Component } from 'react';
import { View, StatusBar, AsyncStorage, UIManager, AppRegistry, Platform } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getStoredState, createPersistor } from 'redux-persist';

const appProps = {
  nativeProps: {},
  appBundle: null,
  testUIBundle: null,
  appStyle: null,
  appName: null,
  statusBarProps: {},
  reducers: {},
  whitelistReducerKeys: [],
  services: [],
  NavigationService: null,
  Router: null,
};

class FSApp extends Component {

  state = {};

  componentWillMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    appProps.nativeProps = { ...this.props, ...appProps.nativeProps };

    let prefix = '';
    if (appProps.testUIBundle && this.props.testUI) {
      prefix = 'testUI::';
      appProps.testUIBundle();
    } else if (appProps.appBundle) {
      appProps.appBundle();
    }

    const persistConfig = { storage: AsyncStorage, whitelist: appProps.whitelistReducerKeys, keyPrefix: prefix };
    const middlewares = [ReduxThunk];
    getStoredState(persistConfig, (err, restoredState) => {
      const store = createStore(
        combineReducers(appProps.reducers),
        restoredState,
        composeWithDevTools(applyMiddleware(...middlewares)),
      );
      const persistor = createPersistor(store, persistConfig);
      this.setState({ store, persistor });
    });
  }

  render() {
    const { store, persistor } = this.state;
    const { Router, statusBarProps, NavigationService, services } = appProps;
    if (store == null) {
      return <View />;
    }
    return (
      <Provider store={store} persistor={persistor}>
        <View style={appProps.appStyle || { flex: 1, backgroundColor: 'black' }}>
          <StatusBar {...statusBarProps} />
          {Router ? <Router /> : <NavigationService />}
          {services.map((Service, i) => <Service key={i} />)}
        </View>
      </Provider>
    );
  }
}

const FSAppCollector = {
  appProps,

  addService: (service) => {
    appProps.services.push(service);
  },

  setNavigationService: (service) => {
    appProps.NavigationService = service;
  },

  setAppBundle: (appName, appBundle) => {
    appProps.appBundle = appBundle;
    appProps.appName = appName;
    AppRegistry.registerComponent(appName, () => FSApp);
  },

  setTestUIBundle: (testUIBundle) => {
    appProps.testUIBundle = testUIBundle;
  },

  setAppStyle: (appStyle) => {
    appProps.appStyle = appStyle;
  },

  setRouter: (Router) => {
    appProps.Router = Router;
  },

  addReducer: (key, reducer, options = { whitelist: false }) => {
    appProps.reducers[key] = reducer;
    if (options.whitelist) {
      appProps.whitelistReducerKeys.push(key);
    }
  },

  register: ({ name }) => {
    appProps.appName = name;
    AppRegistry.registerComponent(name, () => FSApp);
  }
};

export { FSAppCollector as FSApp };
