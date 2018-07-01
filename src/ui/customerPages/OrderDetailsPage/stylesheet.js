import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  title: {
    fontFamily: fonts.proximaNovaBold,
    color: colors.greyishDark,
    fontSize: 16
  },
  detail: {
    fontFamily: fonts.proximaNova,
    color: colors.greyish,
    flex: 1,
    marginLeft: 10,
    textAlign: 'right',
    fontSize: 16
  },
  button: {
    margin: 15
  }
}));