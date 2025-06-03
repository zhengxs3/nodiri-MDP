import { useLocalSearchParams, useRouter } from 'expo-router';
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

const labelToImage = {
  'Se réveiller': require('@/assets/images/imgAppliNodiri/3-5 ans/Routine/Routine 1.png'),
  'Déjeuner': require('@/assets/images/imgAppliNodiri/3-5 ans/Routine/Routine 7.png'),
  'Faire sa toilette': require('@/assets/images/imgAppliNodiri/3-5 ans/Routine/Routine 3.png'),
  'S’habiller': require('@/assets/images/imgAppliNodiri/3-5 ans/Routine/Routine 5.png'),
};

export default function HomeScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const { data } = useLocalSearchParams();
  const selectedLabels = data ? JSON.parse(data) : [];

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
          <TouchableOpacity style={styles.addEventBtn} onPress={() => router.push('/login/3-5/ajouterEvenement')}>
            <Image source={require('@/assets/images/plus.png')} style={{ width: 18, height: 19, marginRight: 8 }} />
            <Text style={styles.addEventText}>Ajouter un événement</Text>
          </TouchableOpacity>

          <Text style={styles.dateText}>{dateFormatted}</Text>

          {/* Routine 表格内容根据是否有 label 来显示 */}
          {selectedLabels.length === 0 ? (
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
          ) : (
            <View style={styles.table}>
              {selectedLabels.map((label, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={styles.leftCell}>
                    <Image source={labelToImage[label]} style={styles.icon} />
                  </View>
                  <View style={styles.rightCell}>
                    <Text style={styles.labelText}>{label}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {menuVisible && <PopupMenu onClose={() => setMenuVisible(false)} />}
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
    marginBottom: 30,
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
    justifyContent: 'center',
  },
  icon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  labelText: {
    fontSize: 16,
    paddingLeft: 10,
    color: '#000',
  },
});
