import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.greyishLight
  },
  emptyContainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.greyishLight
  },
  emptyText: {
    fontFamily: fonts.proximaNova,
    color: colors.greyish,
    fontSize: 16,
    marginBottom: 20
  },
  emptyButton: {
    width: 250
  }
}));
