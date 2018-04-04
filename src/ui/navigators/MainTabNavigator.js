import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import TabNavigator from './TabNavigator';
import { TabBar } from '../components';

const mapStateToProps = state => ({
  nav: state.nav
});

const getCurrentRoute = nav => (nav.routes && nav.index !== undefined ? getCurrentRoute(nav.routes[nav.index]) : nav);

class MainTabBar extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.navigationState !== this.props.navigationState;
  }

  onSelectIndex = i => {
    const { navigationState, jumpToIndex, nav, back } = this.props;
    if (navigationState.index === i) {
      const tabRoute = navigationState.routes[i];
      const firstRoute = tabRoute.routes ? getCurrentRoute(tabRoute.routes[0]) : tabRoute;
      if (getCurrentRoute(nav).key !== firstRoute.key) {
        back();
      } else {
        const onPress = this.props.getOnPress({ route: this.props.navigationState.routes[i] });
        if (onPress) {
          onPress();
        }
      }
    } else {
      jumpToIndex(i);
    }
  };

  render() {
    const { navigationState, getLabel, renderIcon } = this.props;
    return (
      <TabBar
        selectedIndex={navigationState.index}
        onSelectIndex={i => this.onSelectIndex(i)}
        tabs={navigationState.routes.map(r => ({
          text: getLabel({ route: r }),
          icon: renderIcon({ route: r })
        }))}
      />
    );
  }
}

const MainTabBarWithRedux = connect(mapStateToProps, NavigationActions)(MainTabBar);

const configBuilder = config => ({
  tabBarComponent: MainTabBarWithRedux,
  tabBarPosition: 'bottom',
  ...config
});

export default (routes, config = {}) => TabNavigator(routes, configBuilder(config));
