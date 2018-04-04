import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.13)',
    marginVertical: 7
  }
}));
