import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  contentContainer: {
    padding: 20
  },
  image: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 5,
    marginBottom: 20,
    borderColor: colors.white
  }
}));
