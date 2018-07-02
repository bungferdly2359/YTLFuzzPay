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
    width: 100,
    height: 100,
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: colors.white
  }
}));
