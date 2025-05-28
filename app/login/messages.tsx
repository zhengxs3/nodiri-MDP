import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

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
          <TouchableOpacity style={styles.addEventBtn} onPress={() => router.push('/login/3-5/ajouterMessage')}>
            <Image source={require('@/assets/images/plus.png')} style={{ width: 18, height: 19, marginRight: 8 }} />
            <Text style={styles.addEventText}>Démarrer une conversation</Text>
          </TouchableOpacity>

          {/* Conversation 列表 */}
          <View style={styles.conversationList}>
            {[1, 2, 3, 4].map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.conversationCard}
                onPress={() => router.push(`/login/conversation/${num}`)}
              >
                <Text style={styles.conversationTitle}>Conversation {num}</Text>
                <Text style={styles.conversationText}>
                  blablablablablabla blablablablablabla blablablablablabla
                </Text>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>

        {/* ✅ popupMenu 放在 ScrollView 外部，固定右上角 */}
        {menuVisible && (
          <View
            style={styles.popupMenu}
            onStartShouldSetResponder={() => true}
          >
            <TouchableOpacity onPress={() => console.log('Aide')}>
              <Text style={styles.menuItem}>Aide</Text>
            </TouchableOpacity>
            <View style={styles.menuSeparator} />
            <TouchableOpacity onPress={() => console.log('Paramètres')}>
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
});
