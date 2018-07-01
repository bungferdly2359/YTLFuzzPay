import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  text: {
    fontFamily: fonts.proximaNova,
    fontSize: 17,
    color: colors.greyishDark,
    margin: 20
  }
}));
