import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import PopupMenu from '../PopupMenu';
import BottomTabBar from './BottomTabBar';

const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const today = new Date();
const dateFormatted = `${jours[today.getDay()]} ${today.getDate()} ${mois[today.getMonth()]}`;

export default function HomeScreen() {
  const router = useRouter();
  const { events } = useLocalSearchParams();
  const [menuVisible, setMenuVisible] = useState(false);
  const { width } = useWindowDimensions();

  const parsedEvents = events ? JSON.parse(events) : {};

  const handleOutsidePress = () => {
    Keyboard.dismiss();
    if (menuVisible) setMenuVisible(false);
  };

  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const startDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  const calendarCells = [];
  for (let i = 0; i < startDay; i++) calendarCells.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarCells.push(i);

  const isToday = (day) => day === today.getDate();
  const displayHours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}h`);

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.wrapper}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.centeredTitle}>Agenda</Text>
          <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(!menuVisible)}>
            <Image source={require('@/assets/images/3points.png')} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={[styles.content, width > 600 && styles.centeredContent]}>
            {/* Add event */}
            <TouchableOpacity style={styles.addEventBtn} onPress={() => router.push('/login/11-14/ajouterEvenement')}>
              <Image source={require('@/assets/images/plus.png')} style={{ width: 18, height: 19, marginRight: 8 }} />
              <Text style={styles.addEventText}>Ajouter un événement</Text>
            </TouchableOpacity>

            {/* Mois */}
            <Text style={styles.monthTitle}>{mois[today.getMonth()]}</Text>

            {/* Calendrier */}
            <View style={styles.calendar}>
              {calendarCells.map((day, index) => (
                <View key={index} style={[styles.calendarCell, isToday(day) && styles.todayCell]}>
                  <Text style={[styles.calendarText, isToday(day) && styles.todayText]}>{day ?? ''}</Text>
                </View>
              ))}
            </View>

            {/* Date */}
            <Text style={styles.selectedDate}>{dateFormatted}</Text>

            {/* Heures */}
            <View style={styles.verticalList}>
              {displayHours.map((hour, i) => (
                <View key={i} style={styles.rowItem}>
                  <View style={styles.timeBox}>
                    <Text style={styles.hourText}>{hour}</Text>
                  </View>
                  <View style={styles.eventBox}>
                    <Text style={styles.eventText}>{parsedEvents[hour] || '...'}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Menu + TabBar */}
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
    paddingBottom: 40,
    flexGrow: 1,
  },
  content: {
    width: '100%',
  },
  centeredContent: {
    maxWidth: 600,
    alignSelf: 'center',
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
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E6770F',
    marginTop: 10,
    marginBottom: 10,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: '#388AA8',
    borderRadius: 8,
    marginBottom: 20,
  },
  calendarCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#388AA8',
    borderWidth: 0.5,
    height: 60,
  },
  calendarText: {
    color: '#388AA8',
    fontWeight: '600',
  },
  todayCell: {
    backgroundColor: '#388AA8',
  },
  todayText: {
    color: '#fff',
  },
  selectedDate: {
    fontSize: 18,
    color: '#E6770F',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  verticalList: {
    width: '100%',
  },
  rowItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#388AA8',
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: '#fff',
    height: 55,
    overflow: 'hidden',
  },
  timeBox: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#388AA8',
  },
  hourText: {
    fontSize: 14,
    color: '#388AA8',
    fontWeight: 'bold',
  },
  eventBox: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  eventText: {
    fontSize: 13,
    color: '#388AA8',
  },
});
