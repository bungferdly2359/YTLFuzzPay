// import TransitionConfigs from 'react-navigation/src/views/CardStack/TransitionConfigs';
import { FSNavigationService } from './';

const getCurrentAction = () => FSNavigationService.lastAction;

const specWithModifiedDuration = (spec) => {
  const duration = getCurrentAction().duration;
  if (typeof duration === 'number') {
    return { ...spec, duration };
  }
  return spec;
};

const main = {
  transitionConfig: () => ({
    // transitionSpec: specWithModifiedDuration(TransitionConfigs.defaultTransitionConfig({}, {}, false).transitionSpec)
  })
};

const popup = {
  transitionConfig: () => ({
    screenInterpolator: (props) => {
      const { position, scene } = props;
      const { index } = scene;
      const scale = position.interpolate({
        inputRange: ([index - 1, index, index + 1]),
        outputRange: ([0.8, 1, index === 0 ? 1 : 0.8])
      });
      const opacity = position.interpolate({
        inputRange: ([index - 1, index, index + 1]),
        outputRange: ([0, 1, index === 0 ? 1 : 0])
      });
      return {
        opacity,
        transform: [{ scaleX: scale }, { scaleY: scale }]
      };
    }
  }),
  headerMode: 'none',
  cardStyle: {
    left: -200,
    right: -200,
    top: -200,
    bottom: -200,
    padding: 200,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    shadowOpacity: 0
  }
};

const modal = {
  mode: 'modal',
  headerMode: 'none',
  transitionConfig: () => ({
    // transitionSpec: specWithModifiedDuration(TransitionConfigs.defaultTransitionConfig({}, {}, false).transitionSpec)
  })
};

export default {
  modal,
  popup,
  main
};
