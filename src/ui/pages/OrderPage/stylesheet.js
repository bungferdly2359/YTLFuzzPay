import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.greyishWhite
  },
  contentContainer: {
    paddingVertical: 25
  },
  itemContainer: {
    flexDirection: 'row'
  },
  iconContainer: {
    width: 83,
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: -3,
    marginLeft: -20,
    marginRight: 13
  },
  iconImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.orange,
    overflow: 'hidden'
  },
  iconText: {
    fontFamily: fonts.proximaNova,
    fontSize: 10,
    fontWeight: '600',
    color: '#383838'
  },
  ordersContainer: {
    flex: 1
  },
  orderContainer: {
    marginVertical: 8
  },
  detail: {
    fontFamily: fonts.proximaNova,
    fontSize: 16,
    fontWeight: '600',
    color: '#383838',
    marginBottom: 7
  },
  subdetail: {
    fontFamily: fonts.proximaNova,
    fontSize: 14,
    fontWeight: 'normal',
    color: '#383838'
  },
  checkbox: {
    marginVertical: 8
  }
}));
