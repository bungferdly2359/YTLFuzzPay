import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: props.statusBarHeight + 20,
    paddingBottom: props.bottomSpace + 20,
    backgroundColor: colors.white
  },
  image: {
    flex: 1,
    alignSelf: 'center',
    marginBottom: 15
  },
  detail: {
    fontFamily: fonts.proximaNova,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.greyishBrown,
    marginBottom: 35
  },
  register: {
    marginBottom: 30
  },
  login: {
    fontFamily: fonts.proximaNova,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.greyishBrown,
    marginBottom: 15
  }
}));
