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
  button: {
    flex: 1,
    marginHorizontal: 5
  },
  image: {
    alignItems: 'flex-end',
    backgroundColor: colors.greyishLight,
    justifyContent: 'flex-end',
    paddingBottom: 15,
    height: 180
  },
  newOptionContainer: {
    backgroundColor: '#EEE',
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: -5
  }
}));
