import { FSStyleSheet } from '../../modules/fs-foundation';
import { colors, fonts } from '../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,.55)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContainer: {
    paddingVertical: props.getSize(25),
    paddingHorizontal: props.getSize(20),
    backgroundColor: colors.white,
    borderRadius: 3,
    alignItems: 'center',
    overflow: 'hidden'
  },
  text: {
    fontFamily: fonts.proximaNova,
    fontSize: 16,
    textAlign: 'center',
    color: colors.darkGray
  }
}));
