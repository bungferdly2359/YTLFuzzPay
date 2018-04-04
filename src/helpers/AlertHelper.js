import { Alert, Platform, ToastAndroid, ActionSheetIOS, Linking } from 'react-native';

const showError = (message, action) => {
  Alert.alert('Error', message, action);
};

const showSuccess = (message, action) => {
  Alert.alert('Success', message, action);
};

export const AlertHelper = {
  showError,
  showSuccess
};
