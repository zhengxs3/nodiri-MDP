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
import PopupMenu from '../PopupMenu';
import BottomTabBar from './BottomTabBar';

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
          <Text style={styles.centeredTitle}>Boîte à outils</Text>
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

        {/* 🔽 Scrollable 内容区域 */}
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Routine 卡片 */}
          <View style={styles.grid}>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/login/detail',
                  params: {
                    title: 'La fusee du calme',
                    imageKey: 'fuseecalme',
                  },
                })
              }
            >
              <Image
                source={require('@/assets/images/imgAppliNodiri/6-10 ans/Boite a outils/Img fusee du calme.png')}
                style={styles.icon}
              />
              <Text style={styles.cardLabel}>La fusée du calme</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/login/detail',
                  params: {
                    title: 'A la maison',
                    imageKey: 'gomaison',
                  },
                })
              }
            >
              <Image
                source={require('@/assets/images/imgAppliNodiri/6-10 ans/Boite a outils/Img a la maison.png')}
                style={styles.icon}
              />
              <Text style={styles.cardLabel}>A la maison</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

        {/* Menu déroulant */}
        {menuVisible && (
          <PopupMenu onClose={() => setMenuVisible(false)} />
        )}

        {/* Bottom navigation */}
        <BottomTabBar />

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
    paddingBottom: 80,
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
  sectionTitle: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2F7C8D',
    marginVertical: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '47%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 145,
    height: 145,
    borderRadius: 12,
    resizeMode: 'contain',
  },
  cardLabel: {
    marginTop: 8,
    color: 'fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
