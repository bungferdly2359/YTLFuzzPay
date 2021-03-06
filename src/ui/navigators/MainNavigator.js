import { StackNavigator } from 'react-navigation';

const defaultConfig = {
  transitionConfig: () => ({
    screenInterpolator: props => {
      const sceneIndex = props.scenes.indexOf(props.scene);
      // if (props.scene.isStale && sceneIndex < props.scenes.length - 1) {
      //   return { opacity: 0.5 };
      // }
      const { position, scene } = props;
      const { index } = scene;
      const scale = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [1.1, 1, 1]
      });
      const opacity = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 1]
      });
      return {
        opacity,
        transform: [{ scaleX: scale }, { scaleY: scale }]
      };
    }
  }),
  headerMode: 'none',
  cardStyle: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 0
  }
};

export default (routes, config = {}) =>
  StackNavigator(routes, {
    ...config,
    ...defaultConfig,
    navigationOptions: routes[Object.keys(routes)[0]].screen.navigationOptions
  });
