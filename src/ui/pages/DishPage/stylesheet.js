import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.greyishWhite
  },
  full: {
    flex: 1
  },
  contentContainer: {
    paddingVertical: 25
  },
  button: {
    marginVertical: 5
  }
}));
