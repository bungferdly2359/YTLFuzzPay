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
  input: {
    marginTop: 25,
    marginBottom: 50
  },
  contentContainer: {
    padding: 25
  }
}));
