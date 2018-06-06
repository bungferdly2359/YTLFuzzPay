import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  searchList: {
    ...props.fullStyle,
    backgroundColor: colors.white
  },
  image: {
    overflow: 'hidden',
    borderRadius: 3,
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
    marginBottom: 4,
    fontWeight: '600',
    color: '#383838'
  },
  header: {
    borderRadius: 3,
    marginHorizontal: 17,
    marginTop: 10
  },
  location: {
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
    marginTop: 4,
    marginLeft: 3,
    fontFamily: fonts.proximaNova,
    fontSize: 14,
    color: '#383838'
  }
}));
