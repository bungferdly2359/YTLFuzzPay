import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  cell: {
    flexDirection: 'column'
  },
  directory: {
    fontFamily: fonts.proximaNova,
    fontSize: 12,
    color: colors.greyish,
    marginBottom: 10
  },
  directoryName: {
    color: colors.orange
  },
  dishContainer: {
    flexDirection: 'row'
    // alignItems: 'center'
  },
  detailContainer: {
    flex: 1
  },
  title: {
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    color: colors.greyishDark
  },
  image: {
    overflow: 'hidden',
    borderRadius: 3,
    backgroundColor: colors.greyishWhite,
    marginRight: 10,
    width: 36,
    height: 36
  },
  info: {
    fontFamily: fonts.proximaNova,
    fontSize: 14,
    color: colors.greyish
  },
  trashIcon: {
    width: 25,
    height: 25,
    marginLeft: 10,
    tintColor: colors.red
  },
  totalContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowRadius: 3,
    shadowOpacity: 0.1,
    shadowColor: colors.black,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    alignItems: 'center',
    height: 44
  },
  total: {
    fontFamily: fonts.proximaNovaBold,
    color: colors.greyishDark,
    fontSize: 16
  }
}));
