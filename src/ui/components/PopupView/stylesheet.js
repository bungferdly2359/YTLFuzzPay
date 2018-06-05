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
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: props.outerSpaceHorizontal + 15,
    padding: 25,
    paddingTop: 0,
    minHeight: 450,
    maxHeight: props.deviceHeight * 0.8
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: -25,
    zIndex: 100
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    marginLeft: 44,
    alignSelf: 'center',
    fontFamily: fonts.proximaNova,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: colors.darkGray
  }
}));
