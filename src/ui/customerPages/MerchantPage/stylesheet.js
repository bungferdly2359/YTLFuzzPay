import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  touchable: {
    borderRadius: 3,
    overflow: 'hidden'
  },
  itemContainer: {
    flex: 1,
    padding: 5,
    backgroundColor: colors.white
  },
  image: {
    borderRadius: 3,
    overflow: 'hidden',
    aspectRatio: 1,
    backgroundColor: colors.greyishWhite
  },
  name: {
    fontFamily: fonts.proximaNova,
    fontSize: 16,
    fontWeight: '600',
    color: colors.greyishDark
  },
  info: {
    fontFamily: fonts.proximaNova,
    fontSize: 14,
    fontWeight: 'normal',
    color: colors.greyish
  }
}));
