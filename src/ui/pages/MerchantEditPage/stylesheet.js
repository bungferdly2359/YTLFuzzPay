import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  full: {
    flex: 1
  },
  contentContainer: {
    padding: 25,
    flexDirection: 'column-reverse'
  },
  image: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: colors.white
  },
  searchContainer: {
    marginHorizontal: -20
  },
  searchInput: {
    marginHorizontal: 20
  },
  searchList: {
    position: 'absolute',
    left: 15,
    right: 15,
    top: -18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.greyish
  },
  searchCell: {
    height: 35,
    paddingHorizontal: 5,
    backgroundColor: colors.greyishWhite
  },
  searchContentCell: {
    paddingVertical: 0,
    alignItems: 'center',
    backgroundColor: colors.greyishWhite
  },
  title: {
    flex: 1,
    fontFamily: fonts.proximaNova,
    // height: 35,
    fontSize: 14
  },
  location: {
    fontFamily: fonts.proximaNova,
    fontSize: 14
  }
}));
