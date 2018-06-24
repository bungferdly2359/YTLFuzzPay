import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  icon: {
    width: 25,
    height: 25,
    backgroundColor: colors.greyishLight,
    borderRadius: 12
  },
  selected: {
    backgroundColor: colors.orange
  }
}));
