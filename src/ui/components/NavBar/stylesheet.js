import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
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
    elevation: 3,
    zIndex: 100
  },
  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    left: 7,
    right: 7,
    top: props.statusBarHeight,
    height: props.navigationBarHeight
  },
  separator: {
    flex: 1
  },
  titleContainer: {
    backgroundColor: colors.white,
    height: props.navigationBarHeight,
    justifyContent: 'center'
  },
  title: {
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    textAlign: 'center',
    color: '#383838'
  }
}));
