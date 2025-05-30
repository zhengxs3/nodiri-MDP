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
                    title: 'Les émotions',
                    imageKey: 'emotion',
                  },
                })
              }
            >
              <Image
                source={require('@/assets/images/imgAppliNodiri/3-5 ans/Boite a outils/Img emotion.png')}
                style={styles.icon}
              />
              <Text style={styles.cardLabel}>Les émotions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/login/detail',
                  params: {
                    title: 'Les mots magiques',
                    imageKey: 'motmagiques',
                  },
                })
              }
            >
              <Image
                source={require('@/assets/images/imgAppliNodiri/3-5 ans/Boite a outils/Img mots magiques.png')}
                style={styles.icon}
              />
              <Text style={styles.cardLabel}>Les mots magiques</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/login/detail',
                  params: {
                    title: 'La météo',
                    imageKey: 'meteo',
                  },
                })
              }
            >
              <Image
                source={require('@/assets/images/imgAppliNodiri/3-5 ans/Boite a outils/Img meteo.png')}
                style={styles.icon}
              />
              <Text style={styles.cardLabel}>La météo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/login/detail',
                  params: {
                    title: 'La communication',
                    imageKey: 'communication',
                  },
                })
              }
            >
              <Image
                source={require('@/assets/images/imgAppliNodiri/3-5 ans/Boite a outils/Img communication.png')}
                style={styles.icon}
              />
              <Text style={styles.cardLabel}>La communication</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/login/detail',
                  params: {
                    title: 'Les émotions',
                    imageKey: 'emotion',
                  },
                })
              }
            >
              <Image
                source={require('@/assets/images/imgAppliNodiri/3-5 ans/Boite a outils/Img emotion.png')}
                style={styles.icon}
              />
              <Text style={styles.cardLabel}>Les émotions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/login/detail',
                  params: {
                    title: 'Les mots magiques',
                    imageKey: 'motmagiques',
                  },
                })
              }
            >
              <Image
                source={require('@/assets/images/imgAppliNodiri/3-5 ans/Boite a outils/Img mots magiques.png')}
                style={styles.icon}
              />
              <Text style={styles.cardLabel}>Les mots magiques</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/login/detail',
                  params: {
                    title: 'La météo',
                    imageKey: 'meteo',
                  },
                })
              }
            >
              <Image
                source={require('@/assets/images/imgAppliNodiri/3-5 ans/Boite a outils/Img meteo.png')}
                style={styles.icon}
              />
              <Text style={styles.cardLabel}>La météo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/login/detail',
                  params: {
                    title: 'La communication',
                    imageKey: 'communication',
                  },
                })
              }
            >
              <Image
                source={require('@/assets/images/imgAppliNodiri/3-5 ans/Boite a outils/Img communication.png')}
                style={styles.icon}
              />
              <Text style={styles.cardLabel}>La communication</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

        {/* ✅ popupMenu 放在 ScrollView 外部，固定在右上角 */}
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
            <Image source={require('@/assets/images/img0boiteOutils1.png')} style={styles.tabIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login/3-5/accueil')}>
            <Image source={require('@/assets/images/img0accueil0.png')} style={styles.tabIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login/3-5/apprentissage')}>
            <Image source={require('@/assets/images/img0apprentissage0.png')} style={styles.tabIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login/messages')}>
            <Image source={require('@/assets/images/img0messages0.png')} style={styles.tabIcon} />
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
