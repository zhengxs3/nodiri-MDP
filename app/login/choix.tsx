import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleOutsidePress = () => {
    if (menuVisible) setMenuVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        {/* Background decorations */}
        <Image source={require('@/assets/images/entree01.png')} style={[styles.decor, { top: 0, left: -30, width: 120, height: 120 }]} />
        <Image source={require('@/assets/images/entree02.png')} style={[styles.decor, { top: -30, right: 0, width: 180, height: 180 }]} />
        <Image source={require('@/assets/images/entree03.png')} style={[styles.decor, { top: height * 0.17, left: width * 0.28, width: 100, height: 60 }]} />
        <Image source={require('@/assets/images/entree04.png')} style={[styles.decor, { top: height * 0.50, right: width * 0.08, width: 55, height: 55 }]} />
        <Image source={require('@/assets/images/entree05.png')} style={[styles.decor, { bottom: height * 0.20, left: width * 0.08, width: 90, height: 90 }]} />
        <Image source={require('@/assets/images/entree06.png')} style={[styles.decor, { bottom: -30, right: 60, width: 140, height: 100 }]} />

        <ScrollView contentContainerStyle={styles.scroll}>
          <TouchableOpacity style={styles.saveButton} onPress={() => router.push('/login/3-5/accueil')}>
            <Text style={styles.saveButtonText}>3-5 ans</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={() => router.push('/6-10')}>
            <Text style={styles.saveButtonText}>6-10 ans</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={() => router.push('/11-14')}>
            <Text style={styles.saveButtonText}>11-14 ans</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={() => router.push('/15-plus')}>
            <Text style={styles.saveButtonText}>15+ ans</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={() => router.push('/parents')}>
            <Text style={styles.saveButtonText}>Parents</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
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
  scroll: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    flexGrow: 1,
    zIndex: 10,
  },
  saveButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    height: 60,
    width: 240,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    zIndex: 10,
  },
  saveButtonText: {
    color: '#388AA8',
    fontSize: 18,
    fontWeight: 'bold',
  },
  decor: {
    position: 'absolute',
    resizeMode: 'contain',
    opacity: 0.85,
    zIndex: 1,
  },
});
