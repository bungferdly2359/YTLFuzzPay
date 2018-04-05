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
    fontSize: 36,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {
      width: 0,
      height: 2
    },
    textShadowRadius: 4
  },
  name: {
    fontFamily: fonts.proximaNova,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#383838'
  }
}));
