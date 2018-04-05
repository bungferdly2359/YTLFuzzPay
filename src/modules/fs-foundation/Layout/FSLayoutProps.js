import { Platform, Dimensions, StyleSheet } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const fullStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

class FSLayoutProps {
  getSize: Number => Number;
  deviceScale: Number;
  isSmallScreen: Boolean;
  isTablet: Boolean;
  isIOS: Boolean;
  isAndroid: Boolean;
  isPortrait: Boolean;
  isLandscape: Boolean;
  width: Number;
  height: Number;
  statusBarHeight: Number;
  navigationBarHeight: Number;
  tabBarHeight: Number;
  deviceWidth: Number;
  deviceHeight: Number;
  outerSpaceHorizontal: Number;
  outerSpaceVertical: Number;
  topTabBarHeight: Number;
  bottomSpace: Number;
  hairlineWidth: Number;
  fullStyle: Object;

  static deviceWidth = Math.min(deviceWidth, deviceHeight);
  static deviceHeight = Math.max(deviceWidth, deviceHeight);

  constructor({ width, height }) {
    const isIOS = Platform.OS === 'ios';
    const isIphoneX = height === 812;
    const minLength = Math.min(width, height);
    let deviceScale = 1;
    if (minLength >= 768) deviceScale = 1.2;
    else if (minLength <= 320 && isIOS)
      // else if (minLength >= 400 && isIOS) deviceScale = 1.1;
      deviceScale = 0.8;

    this.getSize = size => Math.ceil(size * deviceScale);
    this.deviceScale = deviceScale;
    this.isSmallScreen = minLength <= 320;
    this.isTablet = minLength >= 768;
    this.isIOS = isIOS;
    this.isAndroid = !isIOS;
    this.isPortrait = width < height;
    this.isLandscape = width > height;
    this.width = width;
    this.height = height;
    this.statusBarHeight = isIOS ? (isIphoneX ? 40 : 20) : 0;
    this.navigationBarHeight = deviceWidth >= 768 ? 60 : (isIOS ? 44 : 54) * deviceScale;
    this.topTabBarHeight = (isIOS ? 31 : 36) * deviceScale;
    this.tabBarHeight = 48 * deviceScale;
    this.deviceWidth = FSLayoutProps.deviceWidth;
    this.deviceHeight = FSLayoutProps.deviceHeight;
    this.outerSpaceHorizontal = Math.max(0, (width - 600) / 2);
    this.outerSpaceVertical = Math.min(Math.max(width - 670, 0), 50);
    this.bottomSpace = isIphoneX ? 30 : 0;
    this.hairlineWidth = StyleSheet.hairlineWidth;
    this.fullStyle = fullStyle;
  }
}

export default FSLayoutProps;
