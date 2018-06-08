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
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    color: colors.greyishDark
  },
  info: {
    fontFamily: fonts.proximaNova,
    fontSize: 14,
    color: colors.greyish
  },
  headerContainer: {
    marginTop: -10,
    marginBottom: 10
  },
  header: {
    height: 180
  },
  sectionContainer: {
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 4,
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: colors.greyish
  },
  sectionText: {
    fontFamily: fonts.proximaNova,
    color: colors.white,
    fontSize: 14
  },
  location: {
    fontSize: 12,
    fontFamily: fonts.proximaNova,
    color: colors.greyish
  }
}));
