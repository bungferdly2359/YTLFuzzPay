import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    height: 180
  },
  image: {
    overflow: 'hidden',
    borderRadius: 3,
    backgroundColor: colors.greyishWhite,
    marginRight: 10,
    width: 36,
    height: 36
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
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  info: {
    fontFamily: fonts.proximaNova,
    fontSize: 14,
    color: '#868686'
  }
}));
