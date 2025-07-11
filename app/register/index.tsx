import SimpleSelect from '@/components/SimpleSelect';
import { API_URL } from '@/constants/api';
import DateTimePicker from '@react-native-community/datetimepicker';
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

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [birthDateText, setBirthDateText] = useState('');
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [showPicker, setShowPicker] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    const birthValue =
      Platform.OS === 'web'
        ? birthDateText
        : birthDate?.toISOString().split('T')[0];

    if (!name || !role || !birthValue || !email || !password || !confirmPassword) {
      showAlert('Champs obligatoires', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
          role: role.toLowerCase(),
          birthdate: birthValue,
          parent_code: '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log('❌ Erreurs:', data);
        showAlert('Erreur', data.errors?.join('\n') || data.message || 'Erreur inconnue');
        return;
      }

      showAlert('Succès', 'Inscription réussie !');
      router.replace('/register/paiment');
    } catch (error: any) {
      console.error('Erreur lors de l’inscription', error);
      showAlert('Erreur', 'Une erreur est survenue. Vérifiez votre connexion.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Inscription</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Nom complet *</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          </View>

          <SimpleSelect
            label="Vous êtes"
            required
            selected={role}
            onSelect={setRole}
            options={[
              { label: 'Sélectionner -', value: '' },
              { label: 'Adolescent', value: 'child' },
              { label: 'Parent', value: 'parent' },
              { label: 'Professionnel de santé', value: 'sante' },
              { label: "Professionnel de l'éducation", value: 'education' },
            ]}
          />

          <View style={styles.field}>
            <Text style={styles.label}>Date de naissance *</Text>
            {Platform.OS === 'web' ? (
              <input
                type="date"
                value={birthDateText}
                onChange={(e) => setBirthDateText(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                style={{
                  width: '93%',
                  height: 44,
                  fontSize: 14,
                  padding: '0 12px',
                  border: '1px solid #333',
                  borderRadius: 4,
                  backgroundColor: 'white',
                  fontFamily: 'inherit',
                }}
              />
            ) : (
              <>
                <TouchableOpacity onPress={() => setShowPicker(true)}>
                  <TextInput
                    style={styles.input}
                    value={birthDate ? birthDate.toLocaleDateString('fr-FR') : ''}
                    placeholder="JJ/MM/AAAA"
                    editable={false}
                    pointerEvents="none"
                  />
                </TouchableOpacity>
                {showPicker && (
                  <DateTimePicker
                    value={birthDate || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    maximumDate={new Date()}
                    onChange={(event, selectedDate) => {
                      setShowPicker(false);
                      if (selectedDate) {
                        setBirthDate(selectedDate);
                      }
                    }}
                  />
                )}
              </>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Mot de passe *</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Validation du mot de passe *</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <Text style={styles.note}>
            L’application est disponible pour un tarif unique de 9.99€
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>S’inscrire et payer</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.back}>Retour au menu</Text>
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
    padding: 10,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    color: '#2F7C8D',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  field: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 5,
    marginLeft: 4,
  },
  input: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 12,
    borderRadius: 4,
    fontSize: 14,
    backgroundColor: 'white',
  },
  note: {
    color: '#f58634',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#219EBC',
    padding: 13,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  back: {
    color: '#444',
    textDecorationLine: 'underline',
    fontSize: 12,
  },
});
