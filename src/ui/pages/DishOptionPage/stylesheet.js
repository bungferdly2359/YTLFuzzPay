import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  contentContainer: {
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 15,
    marginHorizontal: 25
  },
  button: {
    flex: 1,
    marginHorizontal: 5
  },
  buttonContainer: {
    flexDirection: 'row'
  }
}));
