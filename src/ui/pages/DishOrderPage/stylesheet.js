import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    padding: 0
  },
  contentContainer: {
    padding: 20
  },
  image: {
    height: 180
  },
  text: {
    fontFamily: fonts.proximaNova,
    color: colors.greyishDark,
    fontSize: 16
  },
  title: {
    fontFamily: fonts.proximaNovaBold,
    fontSize: 22,
    marginVertical: 5,
    marginBottom: 10
  },
  description: {
    fontSize: 15,
    color: colors.greyish,
    marginBottom: 20
  },
  content2Container: {
    padding: 10
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
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  checkboxTitle: {
    marginLeft: 8
  },
  infoButton: {
    marginLeft: 5
  },
  infoIcon: {
    width: 20,
    height: 20
  },
  inputText: {
    backgroundColor: colors.greyishWhite,
    borderRadius: 3,
    padding: 10
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
  cartButton: {
    borderRadius: 0,
    marginBottom: -1
  }
}));
