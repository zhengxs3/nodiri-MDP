import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
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

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!name || !password) {
      showAlert('Champs obligatoires', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    console.log({ name, password });
    showAlert('Succès', 'Connexion réussie !');
    router.replace('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Image source={require('@/assets/images/Group 18c.png')} style={styles.logo} />
        <Text style={styles.title}>Connexion</Text>

        {/* Nom */}
        <View style={styles.field}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
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


        <TouchableOpacity style={styles.forgotContainer} onPress={() => router.push('/login/forgotPassword')}>
          <Text style={styles.forgot}>Mot de passe oublié ?</Text>
        </TouchableOpacity>


        {/* Submit button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        {/* Retour */}
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>Retour au menu</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    width: 150,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#2F7C8D',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  field: {
    width: '100%',
    marginBottom: 15,
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
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  forgot: {
    color: '#999',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#219EBC',
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 999, // 圆形按钮
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
