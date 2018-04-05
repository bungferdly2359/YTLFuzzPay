import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    height: 44 + props.statusBarHeight,
    justifyContent: 'center',
    paddingTop: props.statusBarHeight,
    backgroundColor: colors.white,
    shadowColor: 'rgba(68, 68, 68, 0.19)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    zIndex: 100
  },
  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    left: 7,
    right: 7,
    top: props.statusBarHeight,
    bottom: 0
  },
  separator: {
    flex: 1
  },
  title: {
    fontFamily: fonts.proximaNova,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#383838'
  }
}));
