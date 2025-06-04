import { Platform } from 'react-native';

export const API_URL = Platform.select({
  ios: 'http://192.168.1.42:3000/api',      // remplace par l’IP locale de ton PC
  android: 'http://10.0.2.2:3000/api',
  default: 'http://localhost:3000/api',     // pour Expo Web
});
