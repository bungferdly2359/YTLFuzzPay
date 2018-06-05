import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  text: {
    fontFamily: fonts.proximaNova,
    fontSize: 16
  },
  title: {
    fontFamily: fonts.proximaNovaBold,
    marginVertical: 5
  },
  contentContainer: {
    borderRadius: 3,
    marginBottom: 10,
    backgroundColor: colors.greyishWhite,
    padding: 10
  },
  extraContainer: {
    height: 130
  },
  extraItemContainer: {
    marginBottom: 10
  },
  additionalContainer: {
    height: 70
  },
  cartContainer: {
    marginTop: 10
  },
  price: {
    color: colors.greyishDark,
    textAlign: 'right'
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  extraName: {
    flex: 1,
    marginHorizontal: 8,
    color: colors.greyishDark
  },
  infoButton: {
    margin: -10
  },
  infoIcon: {
    width: 20,
    height: 20
  },
  inputText: {
    flex: 1,
    marginVertical: -7
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  cartButton: {
    flex: 1,
    marginRight: 20
  },
  totalTitle: {
    fontSize: 13,
    color: colors.greyishBrown
  },
  totalPrice: {
    fontFamily: fonts.proximaNovaBold,
    marginRight: 10
  }
}));
