import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  text: {
    fontFamily: fonts.proximaNova,
    color: colors.greyishDark,
    fontSize: 16
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
    height: 60
  },
  total: {
    fontFamily: fonts.proximaNovaBold,
    color: colors.greyishDark,
    fontSize: 16
  },
  totalPrice: {
    fontSize: 24
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  priceTitle: {
    fontFamily: fonts.proximaNovaBold
  },
  priceSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: colors.greyishLight,
    marginHorizontal: 10
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  radioButtonText: {
    marginLeft: 8
  }
}));
