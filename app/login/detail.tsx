import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Alert,
  Platform,
  Image as RNImage,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

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
    
    fuseecalme: require('@/assets/images/imgAppliNodiri/6-10 ans/Boite a outils/La fusee du calme.png'),
    gomaison: require('@/assets/images/imgAppliNodiri/6-10 ans/Boite a outils/A la maison je peux.png'),
  };

  const selected = imageMap[imageKey as string];
  const imageUri = Asset.fromModule(selected).uri || RNImage.resolveAssetSource(selected).uri;

  const handleShowImagePath = () => {
    const fakePath = Object.entries(imageMap).find(([, val]) => val === selected)?.[0];
    if (Platform.OS === 'web') {
      showAlert('Chemin de l’image', fakePath || 'image inconnue');
    } else {
      showAlert('Téléchargement simulé', `Image prête : ${fakePath || 'image inconnue'}`);
    }
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.topLeftIcon}>
        <RNImage source={require('@/assets/images/Group 183.png')} style={styles.icon} />
      </TouchableOpacity>

      <RNImage source={{ uri: imageUri }} style={styles.detailImage} resizeMode="contain" />

      <View style={styles.footer}>
        <Text style={styles.footerText}>{title}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => router.push('/login/aide')}>
            <RNImage source={require('@/assets/images/iconHelp.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()}>
            <RNImage source={require('@/assets/images/iconCheck.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShowImagePath}>
            <RNImage source={require('@/assets/images/iconDownload.png')} style={styles.icon} />
          </TouchableOpacity>
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
