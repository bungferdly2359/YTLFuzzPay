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
  },
  detailContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between'
  },
  detail: {
    fontFamily: fonts.proximaNova,
    color: colors.greyish,
    fontSize: 14
  },
  actionButton: {
    marginLeft: 15
  },
  footer: {
    margin: 20
  }
}));
