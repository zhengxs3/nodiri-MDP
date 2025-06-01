import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PopupMenu from './PopupMenu';

const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export default function ParentalCodeScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [password, setPassword] = useState('');

  const handleOutsidePress = () => {
    if (menuVisible) setMenuVisible(false);
  };

  const handleSubmit = () => {
    if (!password) {
      showAlert('Erreur', 'Veuillez entrer le mot de passe.');
      return;
    }

    // TODO: 验证密码逻辑（可加后端请求）
    router.replace('/login/3-5/messages');
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.wrapper}>
          {/* 顶部标题区域 */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Image source={require('@/assets/images/left.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.centeredTitle}>Code parental</Text>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setMenuVisible(!menuVisible)}
            >
              <Image source={require('@/assets/images/3points.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          </View>

          {/* 主内容区 */}
          <View style={styles.container}>
            <View style={styles.field}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={styles.forgotContainer}
              onPress={() => router.push('/login/forgotPassword')}
            >
              <Text style={styles.forgot}>Mot de passe oublié ?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
          </View>

          {/* 弹出菜单 */}
          {menuVisible && <PopupMenu onClose={() => setMenuVisible(false)} />}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'web' ? 0 : 20,
  },
  headerRow: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: Platform.OS === 'web' ? 10 : 20,
    padding: 5,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  centeredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F7C8D', 
  },
  menuButton: {
    position: 'absolute',
    right: 15,
    top: Platform.OS === 'web' ? 10 : 20,
    padding: 5,
  },
  container: {
    width: '90%',
    maxWidth: 380,
    alignSelf: 'center',
    marginTop: 40,
  },
  field: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    width: '100%',
    height: 46,
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 12,
    borderRadius: 10,
    fontSize: 14,
    backgroundColor: 'white',
  },
  forgotContainer: {
    marginTop: 2,
    marginBottom: 25,
  },
  forgot: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#219EBC',
    paddingVertical: 13,
    borderRadius: 999,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});
