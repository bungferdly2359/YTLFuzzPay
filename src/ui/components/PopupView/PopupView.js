import React from 'react';
import { TouchableWithoutFeedback, Text, View, KeyboardAvoidingView, Keyboard, ScrollView, Platform } from 'react-native';
import { Button, Image } from '../';
import resources from '../../resources';
import stylesheet from './stylesheet';

export const PopupView = ({ title = '', titleStyle, image, imageStyle, children, style, navigation }) => {
  const styles = stylesheet.styles();
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollContainer} contentContainerStyle={styles.scrollContainer} alwaysBounceVertical={false}>
      <KeyboardAvoidingView style={styles.keyboard} behavior="padding">
        <View style={[styles.container, style]}>
          {title.length > 0 && (
            <View style={styles.header}>
              <Text style={[styles.title, titleStyle]}>{title}</Text>
            </View>
          )}
          {children}
          <Button style={styles.closeButton} iconStyle={styles.closeImage} onPress={() => navigation.goBack()} icon="icon_close" />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
