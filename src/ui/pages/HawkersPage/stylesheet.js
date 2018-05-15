import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  image: {
    borderRadius: 2,
    backgroundColor: colors.greyishWhite,
    marginRight: 17,
    width: 75,
    height: 75
  },
  detailContainer: {
    flex: 1
  },
  title: {
    fontFamily: fonts.proximaNova,
    fontSize: 16,
    fontWeight: '600',
    color: '#383838'
  },
  location: {
    marginVertical: 4,
    flexGrow: 1,
    fontFamily: fonts.proximaNova,
    fontSize: 16,
    color: '#868686'
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  distance: {
    marginLeft: 3,
    fontFamily: fonts.proximaNova,
    fontSize: 14,
    color: '#383838'
  }
}));
