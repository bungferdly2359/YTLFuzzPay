import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  contentContainer: {
    paddingVertical: 25
  },
  itemContainer: {
    marginBottom: 5
  },
  touchable: {
    marginBottom: 7,
    borderRadius: 3,
    overflow: 'hidden'
  },
  image: {
    width: 145,
    height: 145,
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center'
  },
  price: {
    fontFamily: fonts.proximaNova,
    fontSize: 30,
    color: 'white'
  },
  name: {
    fontFamily: fonts.proximaNova,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#383838'
  }
}));
