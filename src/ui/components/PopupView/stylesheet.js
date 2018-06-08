import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  scrollContainer: {
    flex: 1
  },
  keyboard: {
    flex: 1,
    justifyContent: 'center'
  },
  full: props.fullStyle,
  grow: {
    flexGrow: 1
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 3,
    overflow: 'hidden',
    marginHorizontal: props.outerSpaceHorizontal + 15,
    padding: 25,
    paddingTop: 0,
    maxHeight: props.deviceHeight * 0.8
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: -25,
    zIndex: 100
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 30,
    height: 30,
    backgroundColor: '#FFFC',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeImage: {
    tintColor: colors.black,
    width: 15,
    height: 15
  },
  title: {
    flex: 1,
    marginHorizontal: 44,
    fontFamily: fonts.proximaNovaBold,
    textAlign: 'center',
    fontSize: 16,
    color: colors.darkGray
  }
}));
