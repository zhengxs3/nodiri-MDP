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
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Image
              source={require('@/assets/images/left.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.centeredTitle}>Ajouter un évènement</Text>
          </View>
        </View>

        {/* ✅ 单一 ScrollView 包含所有内容 */}
        <ScrollView contentContainerStyle={styles.scroll}>
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

          {/* Routine 卡片 */}
          <View style={styles.grid}>
            <TouchableOpacity style={styles.card}>
              <Image
                source={require('@/assets/images/imgAppliNodiri/3-5 ans/Routine/Routine 1.png')}
                style={styles.cardIcon}
              />
              <Text style={styles.cardLabel}>Se réveiller</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <Image
                source={require('@/assets/images/imgAppliNodiri/3-5 ans/Routine/Routine 7.png')}
                style={styles.cardIcon}
              />
              <Text style={styles.cardLabel}>Déjeuner</Text>
            </TouchableOpacity>
          </View>

          {/* ✅ Enregistrer 按钮 */}
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Enregistrer</Text>
          </TouchableOpacity>
        </ScrollView>
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
    paddingBottom: 20,
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
  centeredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#929292',
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
    marginBottom: 20,
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
  cardIcon: {
    width: 145,
    height: 145,
    borderRadius: 12,
    resizeMode: 'contain',
  },
  cardLabel: {
    marginTop: 8,
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#388AA8',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 60,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
