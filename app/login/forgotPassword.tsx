import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!email) {
      showAlert('Champ requis', 'Veuillez renseigner votre adresse email.');
      return;
    }

    console.log('Demande de réinitialisation envoyée à :', email);
    showAlert('Email envoyé', 'Vérifiez votre boîte de réception pour réinitialiser votre mot de passe.');
    // router.replace('/') 可以根据需要跳转
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Mot de passe{'\n'}oublié ?</Text>
          <Text style={styles.description}>
            Renseignez votre adresse email afin de recevoir les instructions pour réinitialiser votre mot de passe
          </Text>

          {/* Email input */}
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Submit */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Continuer</Text>
          </TouchableOpacity>

          {/* Back */}
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>Retour</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  container: {
    width: '90%',
    maxWidth: 380,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#2F7C8D',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  field: {
    width: '100%',
    marginBottom: 20,
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
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#219EBC',
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 999,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  back: {
    color: '#444',
    textDecorationLine: 'underline',
    fontSize: 12,
  },
});
