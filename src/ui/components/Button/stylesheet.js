import { FSStyleSheet } from '../../../modules/fs-foundation';
import { colors, fonts } from '../../../constants';

export const gradientColors = {
  primary: [colors.lightOrange, colors.orange],
  sheet: [colors.lightOrange, colors.orange],
  destructive: [colors.greyishWhite, colors.greyishLight],
  positive: [colors.lightGreen, colors.green]
};

const container = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: 45,
  paddingHorizontal: 15,
  overflow: 'hidden',
  borderRadius: 3
};

export default FSStyleSheet.create(props => ({
  destructiveContainer: container,
  primaryContainer: container,
  positiveContainer: container,
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
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    color: colors.white
  },
  destructiveText: {
    fontFamily: fonts.proximaNova,
    fontSize: 16,
    color: colors.red
  },
  positiveText: {
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    color: colors.white
  },
  barItemText: {
    fontFamily: fonts.proximaNova,
    fontSize: 16,
    textAlign: 'center',
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
