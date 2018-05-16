import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingHorizontal: 17
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 17,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: 'rgb(234, 234, 234)'
  },
  disclosure: {
    alignSelf: 'center',
    marginLeft: 10
  }
}));
