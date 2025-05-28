import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function BoiteOutilsDetail() {
  const { title, imageKey } = useLocalSearchParams();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const imageMap: Record<string, any> = {
    emotion: require('@/assets/images/imgAppliNodiri/3-5 ans/Boite a outils/Les emotions.png'),
    motmagiques: require('@/assets/images/imgAppliNodiri/3-5 ans/Boite a outils/Les mots magiques.png'),
    meteo: require('@/assets/images/imgAppliNodiri/3-5 ans/Boite a outils/La meteo.png'),
    communication: require('@/assets/images/imgAppliNodiri/3-5 ans/Boite a outils/La communication.png'),
    
    regleclasse: require('@/assets/images/imgAppliNodiri/3-5 ans/Apprentissage/Les regles de classe.png'),
    consigne: require('@/assets/images/imgAppliNodiri/3-5 ans/Apprentissage/Les consignes.png'),
    imagemot: require('@/assets/images/imgAppliNodiri/3-5 ans/Apprentissage/Une image un mot.png'),
    quandjesuisjepeux: require('@/assets/images/imgAppliNodiri/3-5 ans/Apprentissage/Quand je suis... je peux.png'),
  };

  return (
    <View style={styles.container}>
      {/* 左上角返回箭头 */}
      <TouchableOpacity onPress={() => router.back()} style={styles.topLeftIcon}>
        <Image source={require('@/assets/images/Group 183.png')} style={styles.icon} />
      </TouchableOpacity>

      {/* 主图像区域 */}
      <Image
        source={imageMap[imageKey as string]}
        style={styles.detailImage}
        resizeMode="contain"
      />

      {/* 底部固定按钮栏 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{title}</Text>
        <View style={styles.actions}>
          <Image source={require('@/assets/images/iconHelp.png')} style={styles.icon} />
          <Image source={require('@/assets/images/iconCheck.png')} style={styles.icon} />
          <Image source={require('@/assets/images/iconDownload.png')} style={styles.icon} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#388AA8',
    paddingBottom: 120,
  },
  detailImage: {
    width: '100%',
    height: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'web' ? 20 : 60,
  },
  footerText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    marginBottom: 6,
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: '#388AA8',
    padding: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  topLeftIcon: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 10 : 40,
    left: 10,
    zIndex: 10,
  },
});
