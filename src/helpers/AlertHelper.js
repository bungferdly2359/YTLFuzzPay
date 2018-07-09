import { Alert, Platform, ToastAndroid, ActionSheetIOS, Linking } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const showError = (message, action) => {
  Alert.alert('Error', message, action);
};

const showSuccess = (message, action) => {
  Alert.alert('Success', message, action);
};

const showActionSheet = (title = '', message = '', actions) => {
  const newActions = [{ text: 'Cancel', style: 'cancel' }, ...actions];
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: newActions.map(a => a.text),
        cancelButtonIndex: 0
      },
      index => newActions[index].onPress && newActions[index].onPress()
    );
  } else {
    Alert.alert(title, message, newActions);
  }
};

const showImagePicker = (options, completion) => {
  showActionSheet('', 'Change Picture', [
    {
      text: 'Take Photo',
      onPress: () => {
        ImagePicker.openCamera(options).then(image => {
          completion(image);
        });
      }
    },
    {
      text: 'Choose from Gallery',
      onPress: () => {
        ImagePicker.openPicker(options).then(image => {
          completion(image);
        });
      }
    }
  ]);
};

const cleanImagePickerCache = ImagePicker.clean;

export const AlertHelper = {
  showError,
  showSuccess,
  showImagePicker,
  cleanImagePickerCache
};
