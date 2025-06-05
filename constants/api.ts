import { Platform } from 'react-native';

export const API_URL = Platform.select({
  ios: 'http://10.120.129.0:3000/api',      // remplace par l’IP locale de ton PC
  android: 'http://10.120.129.0:3000/api',
  default: 'http://localhost:3000/api',     // pour Expo Web
});
