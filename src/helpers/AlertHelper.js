import { Alert, Platform, ToastAndroid, ActionSheetIOS, Linking } from 'react-native';

const showError = (message, action) => {
  Alert.alert('Error', message, action);
};

export const AlertHelper = {
  showError
};
