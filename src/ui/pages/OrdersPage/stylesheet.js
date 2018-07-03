import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  cellContainer: {
    flex: 1
  },
  qnTitle: {
    marginTop: 15,
    fontFamily: fonts.proximaNova,
    fontSize: 12,
    color: colors.greyish
  },
  qnValue: {
    fontFamily: fonts.proximaNovaBold,
    fontSize: 30,
    color: colors.greyishDark
  },
  dishContainer: {
    flexDirection: 'row'
  },
  date: {
    width: 65,
    fontFamily: fonts.proximaNova,
    color: colors.greyish,
    fontSize: 16
  },
  dishName: {
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    flex: 1,
    color: colors.greyishDark,
    marginHorizontal: 10
  },
  status: {
    fontFamily: fonts.proximaNova,
    color: colors.greyishDark,
    fontSize: 16
  }
}));
