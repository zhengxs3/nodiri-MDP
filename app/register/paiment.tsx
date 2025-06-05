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

const formatCardNumber = (text: string) => {
  return text
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
};

const formatExpiry = (text: string) => {
  const cleaned = text.replace(/\D/g, '').slice(0, 4); // 只保留前4个数字

  if (cleaned.length === 0) return '';

  // 月份（MM）
  const mm = cleaned.slice(0, 2);
  const aa = cleaned.slice(2);

  if (mm.length === 2) {
    const mmNum = parseInt(mm, 10);
    if (mmNum < 1 || mmNum > 12) {
      return mm[0]; // 如果前两位不是合法月份，保留第1位，用户继续输入
    }
  }

  return aa ? `${mm}/${aa}` : mm;
};

const formatCvv = (text: string) => {
  return text.replace(/\D/g, '').slice(0, 3);
};

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = () => {
    if (!name || !cardNumber || !expiry || !cvv) {
      showAlert('Champs manquants', 'Veuillez remplir tous les champs de paiement.');
      return;
    }

    const digitsOnly = cardNumber.replace(/\s/g, '');
    if (digitsOnly.length !== 16) {
      showAlert('Numéro invalide', 'Le numéro de carte doit contenir 16 chiffres.');
      return;
    }

    if (expiry.length !== 5 || !expiry.includes('/')) {
      showAlert('Date invalide', 'Le format de la date doit être MM/AA.');
      return;
    }

    if (cvv.length !== 3) {
      showAlert('CVV invalide', 'Le cryptogramme visuel doit contenir 3 chiffres.');
      return;
    }

    showAlert('Paiement réussi', 'Merci pour votre achat !');
    router.replace('/');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Payer en ligne</Text>

          {/* Nom */}
          <View style={styles.field}>
            <Text style={styles.label}>Nom sur la carte</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Numéro */}
          <View style={styles.field}>
            <Text style={styles.label}>Numéro de carte</Text>
            <TextInput
              style={styles.input}
              placeholder="•••• •••• •••• ••••"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(formatCardNumber(text))}
            />
          </View>

          {/* Date */}
          <View style={styles.field}>
            <Text style={styles.label}>Date d’expiration</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/AA"
              keyboardType="numeric"
              value={expiry}
              onChangeText={(text) => setExpiry(formatExpiry(text))}
            />
          </View>

          {/* CVV */}
          <View style={styles.field}>
            <Text style={styles.label}>Cryptogramme visuel</Text>
            <TextInput
              style={styles.input}
              placeholder="•••"
              keyboardType="numeric"
              value={cvv}
              onChangeText={(text) => setCvv(formatCvv(text))}
            />
          </View>

          {/* Submit button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Payer 9.99€</Text>
          </TouchableOpacity>

          {/* Retour */}
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.back}>Retour à l'inscription</Text>
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
