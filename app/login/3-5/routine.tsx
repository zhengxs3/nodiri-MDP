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
  View,
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
        {/* 🔼 Header */}
        <View style={styles.headerRow}>
          <Text style={styles.centeredTitle}>Routine</Text>
          <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(!menuVisible)}>
            <Image source={require('@/assets/images/3points.png')} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* 添加事件 */}
          <TouchableOpacity style={styles.addEventBtn} onPress={() => router.push('/login/3-5/ajouterEvenement')}>
            <Image source={require('@/assets/images/plus.png')} style={{ width: 18, height: 19, marginRight: 8 }} />
            <Text style={styles.addEventText}>Ajouter un événement</Text>
          </TouchableOpacity>

          {/* 日期标题 */}
          <Text style={styles.dateText}>Mardi 2 Avril</Text>

          {/* Routine 表格 */}
          <View style={styles.table}>
            {[
              require('@/assets/images/imgAppliNodiri/3-5 ans/Routine/Routine 1.png'),
              require('@/assets/images/imgAppliNodiri/3-5 ans/Routine/Routine 7.png'),
              require('@/assets/images/imgAppliNodiri/3-5 ans/Routine/Routine 3.png'),
              require('@/assets/images/imgAppliNodiri/3-5 ans/Routine/Routine 5.png'),
            ].map((source, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.leftCell}>
                  <Image source={source} style={styles.icon} />
                </View>
                <View style={styles.rightCell} />
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Menu déroulant */}
        {menuVisible && (
          <View style={styles.popupMenu} onStartShouldSetResponder={() => true}>
            <TouchableOpacity onPress={() => console.log('Aide')}>
              <Text style={styles.menuItem}>Aide</Text>
            </TouchableOpacity>
            <View style={styles.menuSeparator} />
            <TouchableOpacity onPress={() => console.log('Paramètres')}>
              <Text style={styles.menuItem}>Paramètres</Text>
            </TouchableOpacity>
            <View style={styles.menuSeparator} />
            <TouchableOpacity onPress={() => { setMenuVisible(false); router.replace('/'); }}>
              <Text style={[styles.menuItem, { color: '#E07A1F', fontWeight: 'bold' }]}>
                Se déconnecter
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom navigation */}
        <View style={styles.tabBar}>
          <TouchableOpacity onPress={() => router.push('/login/3-5/routine')}>
            <Image source={require('@/assets/images/img0routine1.png')} style={styles.tabIcon} />
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

          <TouchableOpacity onPress={() => router.push('/login/3-5/messages')}>
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
    paddingHorizontal: 20,
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
    color: '#388AA8',
  },
  menuButton: {
    position: 'absolute',
    right: 10,
    top: 20,
    padding: 5,
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
  dateText: {
    fontSize: 18,
    color: '#E6770F',
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  leftCell: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#000',
  },
  rightCell: {
    flex: 1,
    height: 70,
  },
  icon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
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
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#388AA8',
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
