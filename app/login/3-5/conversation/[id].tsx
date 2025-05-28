import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
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

export default function ConversationDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [inputValue, setInputValue] = useState('');

  // ⚠️ 模拟消息，后期可接数据库
  const messages = [
    { sender: 'Utilisateur 1', text: 'Bonjour, ça va ?', me: false },
    { sender: 'Moi', text: 'Très bien, merci ! Et toi ?', me: true },
    { sender: 'Utilisateur 1', text: 'Super aussi !', me: false },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={60}
    >
      {/* 🔼 返回头部 */}
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

      {/* 🔽 对话内容 */}
      <ScrollView contentContainerStyle={styles.messages}>
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

      {/* ⌨️ 回复输入框 */}
      <View style={styles.replyBox}>
        <Text style={styles.replyTitle}>Répondre</Text>
        <TextInput
          placeholder="Votre message"
          style={styles.input}
          multiline
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity
          onPress={() => {
            console.log('Message envoyé :', inputValue);
            setInputValue('');
          }}
        >
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
    paddingBottom: 30,
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
    borderWidth: 1,
    borderColor: '#000',
    margin: 16,
    borderRadius: 12,
    padding: 10,
    position: 'relative',
  },
  replyTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    minHeight: 60,
    fontSize: 14,
    color: '#000',
  },
  sendArrow: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    fontSize: 22,
    color: '#E07A1F',
  },
});
