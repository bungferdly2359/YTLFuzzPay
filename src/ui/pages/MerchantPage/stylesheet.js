import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  full: {
    flex: 1
  },
  contentContainer: {
    padding: 25
  },
  image: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 15,
    height: 180,
    backgroundColor: colors.greyishWhite
  },
}));
