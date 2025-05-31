import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';

export default function PDFViewer() {
  const { pdfUri } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <WebView source={{ uri: pdfUri }}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 0 : 30,
    paddingBottom: Platform.OS === 'web' ? 0 : 45,
  },
  webview: {
    flex: 1,
  },
});
