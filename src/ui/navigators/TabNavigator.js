import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

const TabComponentWrapper = TabComponent =>
  class Wrapper extends Component {
    index = this.props.navigationState.index;

    shouldComponentUpdate(nextProps) {
      const should = this.index !== nextProps.navigationState.index;
      this.index = nextProps.navigationState.index;
      return should;
    }

    render() {
      return <TabComponent {...this.props} />;
    }
  };

const configBuilder = config => ({
  tabBarPosition: 'top',
  backBehavior: 'none',
  ...config,
  tabBarComponent: TabComponentWrapper(config.tabBarComponent)
});

export default (routes, config = {}) => TabNavigator(routes, configBuilder(config));
