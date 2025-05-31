import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';

export default function PDFViewer() {
  const { pdfUri } = useLocalSearchParams();

  const injectedJS = `
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
    document.getElementsByTagName('head')[0].appendChild(meta);
    true;
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: pdfUri }}
        style={styles.webview}
        injectedJavaScript={Platform.OS !== 'web' ? injectedJS : ''}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
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
