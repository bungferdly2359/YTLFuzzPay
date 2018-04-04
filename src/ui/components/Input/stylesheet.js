import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    paddingBottom: 2,
    marginBottom: 18
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.12)'
  },
  focusBottomLine: {
    borderColor: colors.orange
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowTitle: {
    paddingBottom: 0
  },
  title: {
    fontFamily: fonts.proximaNova,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: '600',
    color: colors.greyishBrown
  },
  focusTitle: {
    color: colors.orange
  },
  detailText: {
    flex: 1,
    fontFamily: fonts.proximaNova,
    fontSize: 16,
    fontWeight: '600',
    color: '#868686'
  },
  inputContainer: {
    flexDirection: 'row'
  },
  prefix: {
    flex: 0,
    marginRight: 5
  }
}));
