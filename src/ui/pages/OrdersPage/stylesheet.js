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
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: '#e8e8e8',
    alignItems: 'center',
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
  menuContainer: {
    flex: 1,
    marginVertical: 12
  },
  dishName: {
    fontFamily: fonts.proximaNova,
    fontSize: 16,
    fontWeight: '600',
    color: '#383838'
  },
  dishDetail: {
    marginTop: 7,
    fontFamily: fonts.proximaNova,
    fontSize: 14,
    fontWeight: 'normal',
    color: '#383838'
  },
  checkbox: {
    marginVertical: 8
  }
}));
