import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export default FSStyleSheet.create(props => ({
  container: {
    flexDirection: 'row',
    height: 50 + props.bottomSpace,
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    borderColor: '#b2b2b2',
    paddingBottom: props.bottomSpace,
    backgroundColor: '#f9f9f9'
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: fonts.proximaNova,
    fontSize: 11,
    fontWeight: 'normal',
    color: '#868686'
  },
  textSelected: {
    color: colors.red
  },
  icon: {
    tintColor: '#868686'
  },
  iconSelected: {
    tintColor: colors.red
  }
}));
