import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';


export default function HomeScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Conversation 1', text: 'Bonjour, ça va ?' },
    { id: 2, title: 'Conversation 2', text: 'Tu as mangé ?' },
    { id: 3, title: 'Conversation 3', text: 'On se voit demain ?' },
    { id: 4, title: 'Conversation 4', text: 'C’est un beau jour !' },
  ]);

  const handleOutsidePress = () => {
    if (menuVisible) setMenuVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.wrapper}>
        {/* 🔽 顶部标题 & 菜单按钮 */}
        <View style={styles.headerRow}>
          <Text style={styles.centeredTitle}>Forum de discussion</Text>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setMenuVisible(!menuVisible)}
          >
            <Image
              source={require('@/assets/images/3points.png')}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>

        {/* 🔽 内容区域 */}
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* 添加新对话按钮 */}
          <TouchableOpacity
            style={styles.addEventBtn}
            onPress={() => setModalVisible(true)}
          >
            <Image source={require('@/assets/images/plus.png')} style={{ width: 18, height: 19, marginRight: 8 }} />
            <Text style={styles.addEventText}>Démarrer une conversation</Text>
          </TouchableOpacity>

          {/* Conversation 列表 */}
          <View style={styles.conversationList}>
            {conversations.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.conversationCard}
                onPress={() => router.push(`/login/conversation/${item.id}`)}
              >
                <Text style={styles.conversationTitle}>{item.title}</Text>
                <Text style={styles.conversationText}>{item.text}</Text>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* 🔽 弹窗 Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>Nouvelle conversation</Text>
              <TextInput
                placeholder="Écrivez ici..."
                style={styles.input}
                value={newMessage}
                onChangeText={setNewMessage}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ color: 'gray' }}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (newMessage.trim()) {
                      const newId = conversations.length + 1;
                      setConversations([
                        ...conversations,
                        {
                          id: newId,
                          title: `Conversation ${newId}`,
                          text: newMessage,
                        }
                      ]);
                      setNewMessage('');
                      setModalVisible(false);
                    }
                  }}
                >
                  <Text style={{ color: '#388AA8', fontWeight: 'bold' }}>Ajouter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* ✅ popupMenu 放在 ScrollView 外部，固定右上角 */}
        {menuVisible && (
          <View
            style={styles.popupMenu}
            onStartShouldSetResponder={() => true}
          >
            <TouchableOpacity onPress={() => router.push('/login/aide')}>
              <Text style={styles.menuItem}>Aide</Text>
            </TouchableOpacity>
            <View style={styles.menuSeparator} />
            <TouchableOpacity onPress={() => router.push('/login/parametre')}>
              <Text style={styles.menuItem}>Paramètres</Text>
            </TouchableOpacity>
            <View style={styles.menuSeparator} />
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                router.replace('/');
              }}
            >
              <Text style={[styles.menuItem, { color: '#E07A1F', fontWeight: 'bold' }]}>
                Se déconnecter
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 🔽 底部导航栏 */}
        <View style={styles.tabBar}>
          <TouchableOpacity onPress={() => router.push('/login/3-5/routine')}>
            <Image source={require('@/assets/images/img0routine0.png')} style={styles.tabIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login/3-5/boiteOutils')}>
            <Image source={require('@/assets/images/img0boiteOutils0.png')} style={styles.tabIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login/3-5/accueil')}>
            <Image source={require('@/assets/images/img0accueil0.png')} style={styles.tabIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login/3-5/apprentissage')}>
            <Image source={require('@/assets/images/img0apprentissage0.png')} style={styles.tabIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login/messages')}>
            <Image source={require('@/assets/images/img0messages1.png')} style={styles.tabIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: Platform.OS === 'web' ? 0 : 35,
  },
  scroll: {
    paddingBottom: 120,
    paddingHorizontal: 16,
  },
  headerRow: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'web' ? 5 : 20,
    height: 70,
  },
  centeredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F7C8D',
  },
  menuButton: {
    position: 'absolute',
    right: 10,
    top: 20,
    padding: 5,
  },
  popupMenu: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 4,
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 4,
  },
  addEventBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addEventText: {
    color: '#388AA8',
    fontSize: 16,
  },
  conversationList: {
    marginTop: 20,
    gap: 12,
  },
  conversationCard: {
    backgroundColor: '#388AA8',
    borderRadius: 12,
    padding: 12,
    position: 'relative',
  },
  conversationTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  conversationText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 18,
  },
  arrow: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    color: '#fff',
    fontSize: 20,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#2F7C8D',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  tabIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});
