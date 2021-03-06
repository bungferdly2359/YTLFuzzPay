import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 17,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.greyishLight
  },
  disclosure: {
    alignSelf: 'center',
    marginLeft: 10
  }
}));
