import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: props.statusBarHeight,
    zIndex: 200
  },
  inputContainer: {
    flex: 1,
    marginVertical: 6,
    marginLeft: 17,
    height: props.navigationBarHeight - 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4
  },
  inputContainerSearching: {
    backgroundColor: colors.greyishWhite
  },
  button: {
    marginLeft: -10
  },
  buttonSearching: {
    marginLeft: 0
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.orange
  },
  iconSearching: {
    width: 14,
    height: 14,
    tintColor: '#666'
  },
  input: {
    alignSelf: 'stretch',
    color: colors.black
  },
  cancel: {
    opacity: 0,
    marginLeft: 4,
    marginRight: -20
  },
  cancelSearching: {
    opacity: 1,
    marginRight: 7
  }
}));
