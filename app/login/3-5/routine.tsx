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
import PopupMenu from '../PopupMenu';
import BottomTabBar from './BottomTabBar';

const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const today = new Date();
const dateFormatted = `${jours[today.getDay()]} ${today.getDate()} ${mois[today.getMonth()]}`;

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
          <Text style={styles.dateText}>{dateFormatted}</Text>

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
});
