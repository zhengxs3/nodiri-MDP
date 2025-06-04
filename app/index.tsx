import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const BUTTON_WIDTH = 250;

// Garde l'écran de splash jusqu’à ce que les polices soient chargées
SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Affiche le splash par défaut
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* 背景图形 */}
      <Image source={require('@/assets/images/entree01.png')} style={[styles.decor, { top: 0, left: -30, width: 120, height: 120 }]} />
      <Image source={require('@/assets/images/entree02.png')} style={[styles.decor, { top: -30, right: 0, width: 180, height: 180 }]} />
      <Image source={require('@/assets/images/entree03.png')} style={[styles.decor, { top: height * 0.17, left: width * 0.28, width: 100, height: 60 }]} />
      <Image source={require('@/assets/images/entree04.png')} style={[styles.decor, { top: height * 0.50, right: width * 0.08, width: 55, height: 55 }]} />
      <Image source={require('@/assets/images/entree05.png')} style={[styles.decor, { bottom: height * 0.20, left: width * 0.08, width: 90, height: 90 }]} />
      <Image source={require('@/assets/images/entree06.png')} style={[styles.decor, { bottom: -30, right: 60, width: 140, height: 100 }]} />

      {/* 正文内容 */}
      <Text style={styles.title}>Bienvenue sur</Text>
      <Image source={require('@/assets/images/entree00.png')} style={styles.logo} />

      <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/login')}>
        <Text style={styles.primaryButtonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/register')}>
        <Text style={styles.secondaryButtonText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#388AA8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Poppins_400Regular',
    zIndex: 10,
  },
  logo: {
    width: 160,
    height: 50,
    marginBottom: 60,
    resizeMode: 'contain',
    zIndex: 10,
  },
  primaryButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    width: BUTTON_WIDTH,
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 15,
    zIndex: 10,
  },
  primaryButtonText: {
    color: '#388AA8',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  secondaryButton: {
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 12,
    width: BUTTON_WIDTH,
    alignItems: 'center',
    borderRadius: 25,
    zIndex: 10,
  },
  secondaryButtonText: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
  decor: {
    position: 'absolute',
    resizeMode: 'contain',
    opacity: 0.85,
    zIndex: 1,
  },
});
