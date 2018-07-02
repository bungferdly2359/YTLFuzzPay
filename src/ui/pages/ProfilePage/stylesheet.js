import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  profileContainer: {
    height: 260,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20
  },
  image: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 5,
    borderColor: colors.white
  },
  name: {
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    color: colors.white,
    marginTop: 10,
    marginBottom: 3,
    textAlign: 'center'
  },
  email: {
    fontFamily: fonts.proximaNova,
    fontSize: 16,
    color: colors.white,
    textAlign: 'center'
  },
  cellText: {
    flex: 1,
    fontFamily: fonts.proximaNova,
    fontSize: 16,
    color: colors.greyishDark
  },
  logout: {
    color: colors.red
  }
}));
