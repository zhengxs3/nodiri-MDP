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

export default function HomeScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleOutsidePress = () => {
    if (menuVisible) setMenuVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.wrapper}>
        {/* 🔼 顶部标题 + 菜单 */}
        <View style={styles.headerRow}>
          <Text style={styles.centeredTitle}>Agenda</Text>
          <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(!menuVisible)}>
            <Image source={require('@/assets/images/3points.png')} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          

          {/* 月份日历（静态模拟） */}
          <Text style={styles.monthTitle}>Avril</Text>
          <View style={styles.calendar}>
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const isToday = day === 2;
              return (
                <View
                  key={day}
                  style={[
                    styles.calendarCell,
                    isToday && { backgroundColor: '#388AA8' }
                  ]}
                >
                  <Text style={[styles.calendarText, isToday && { color: 'white' }]}>{day}</Text>
                </View>
              );
            })}
          </View>

          {/* 时间安排 */}
          <Text style={styles.selectedDate}>Mardi 2 Avril</Text>
          <View style={styles.scheduleRow}>
            {['8h', '9h', '10h', '11h', '12h'].map((hour, i) => (
              <View key={i} style={styles.scheduleBlock}>
                <Text style={styles.hourText}>{hour}</Text>
                <Text style={styles.eventText}>{['Réveil', 'Ecole', 'Ecole', 'Ecole', '...'][i]}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* 菜单弹窗 */}
        {menuVisible && <PopupMenu onClose={() => setMenuVisible(false)} />}

        {/* 底部导航栏 */}
        <BottomTabBar ageGroup="3-5" />
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
    paddingBottom: 100,
  },
  headerRow: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingTop: Platform.OS === 'web' ? 10 : 20,
  },
  centeredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F7C8D',
  },
  menuButton: {
    position: 'absolute',
    right: 15,
    top: Platform.OS === 'web' ? 10 : 20,
    padding: 5,
  },
  addEventBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 14,
  },
  addEventText: {
    color: '#388AA8',
    fontSize: 16,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E6770F',
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
    width: '14.28%', // 7列
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#388AA8',
    borderWidth: 0.5,
  },
  calendarText: {
    color: '#388AA8',
    fontWeight: '600',
  },
  selectedDate: {
    fontSize: 18,
    color: '#E6770F',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scheduleRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#388AA8',
    borderRadius: 10,
    overflow: 'hidden',
  },
  scheduleBlock: {
    width: '20%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#388AA8',
  },
  hourText: {
    fontSize: 14,
    color: '#388AA8',
    fontWeight: 'bold',
  },
  eventText: {
    fontSize: 13,
    color: '#388AA8',
  },
});
