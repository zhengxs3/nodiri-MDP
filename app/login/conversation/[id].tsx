import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ConversationDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets(); // ✅ 获取安全区域 padding（特别是底部）

  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Utilisateur 1', text: 'Bonjour, ça va ?', me: false },
    { sender: 'Moi', text: 'Très bien, merci ! Et toi ?', me: true },
    { sender: 'Utilisateur 1', text: 'Super aussi !', me: false },
  ]);

  const scrollRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    setMessages([...messages, { sender: 'Moi', text: inputValue, me: true }]);
    setInputValue('');
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingBottom: insets.bottom }]} // ✅ 关键修复
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Image
            source={require('@/assets/images/left.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>Conversation {id}</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.messages}
        keyboardShouldPersistTaps="always"
      >
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[styles.messageCard, msg.me ? styles.myMessage : styles.otherMessage]}
          >
            <Text style={styles.sender}>{msg.me ? 'Moi' : msg.sender}</Text>
            <Text style={styles.text}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.replyBox}>
        <TextInput
          placeholder="Votre message"
          style={styles.input}
          multiline
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity onPress={handleSend}>
          <Text style={styles.sendArrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'web' ? 5 : 20,
    height: 70,
    paddingHorizontal: 10,
  },
  backButton: {
    paddingRight: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F7C8D',
  },
  messages: {
    padding: 16,
    paddingBottom: 100,
  },
  messageCard: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  myMessage: {
    backgroundColor: '#E07A1F',
  },
  otherMessage: {
    backgroundColor: '#388AA8',
  },
  sender: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 18,
  },
  replyBox: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    minHeight: 40,
    fontSize: 14,
    color: '#000',
    marginRight: 8,
  },
  sendArrow: {
    fontSize: 26,
    color: '#E07A1F',
    padding: 8,
  },
});
