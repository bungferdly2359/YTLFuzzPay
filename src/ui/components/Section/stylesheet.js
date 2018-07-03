import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    marginVertical: 7
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#c2c2c2',
    height: 40,
    marginHorizontal: -20,
    marginBottom: 10,
    paddingHorizontal: 20
  },
  title: {
    fontFamily: fonts.proximaNova,
    fontSize: 16,
    fontWeight: '600',
    color: colors.greyishBrown
  }
}));
