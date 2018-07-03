import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export const gradientColors = {
  primary: [colors.lightOrange, colors.orange],
  sheet: [colors.lightOrange, colors.orange],
  destructive: [colors.greyishWhite, colors.greyishLight]
};

export default FSStyleSheet.create(props => ({
  destructiveContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    paddingHorizontal: 15,
    overflow: 'hidden',
    borderRadius: 3
  },
  primaryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    paddingHorizontal: 15,
    overflow: 'hidden',
    borderRadius: 3
  },
  barItemContainer: {
    padding: 8
  },
  sheetContainer: {
    borderRadius: 3,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  primaryText: {
    fontFamily: fonts.proximaNova,
    fontWeight: '600',
    fontSize: 16,
    color: colors.white
  },
  destructiveText: {
    fontFamily: fonts.proximaNova,
    fontSize: 16,
    color: colors.red
  },
  barItemText: {
    fontFamily: fonts.proximaNova,
    fontSize: 16,
    fontWeight: '600',
    color: colors.orange
  },
  barItemIcon: {
    tintColor: colors.orange
  },
  sheetText: {
    fontFamily: fonts.proximaNova,
    fontSize: 14,
    color: colors.white
  },
  doneText: {
    color: colors.orange
  },
  gradient: props.fullStyle
}));
