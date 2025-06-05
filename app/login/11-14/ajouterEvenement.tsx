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
  View,
} from 'react-native';

const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const today = new Date();
const dateFormatted = `${jours[today.getDay()]} ${today.getDate()} ${mois[today.getMonth()]}`;

export default function AjouterEvenement() {
  const router = useRouter();
  const [selectedHour, setSelectedHour] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [events, setEvents] = useState({});

  const handleHourPress = (hour) => {
    setSelectedHour(hour);
    setModalVisible(true);
  };

  const handleSaveText = () => {
    setEvents({ ...events, [selectedHour]: inputText });
    setInputText('');
    setModalVisible(false);
  };

  const handleSave = () => {
    // 保存数据并跳转主页
    router.replace({
      pathname: '/login/11-14/routine',
      params: {
        events: JSON.stringify(events),
      },
    });
  };

  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}h`);

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.wrapper}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Image source={require('@/assets/images/left.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.centeredTitle}>Ajouter un évènement</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.dateText}>{dateFormatted}</Text>
          <View style={styles.grid}>
            {hours.map((hour, index) => (
              <TouchableOpacity
                key={index}
                style={styles.timeSlot}
                onPress={() => handleHourPress(hour)}>
                <Text style={styles.timeSlotText}>{hour}</Text>
                {events[hour] && (
                  <View style={styles.eventBox}>
                    <Text style={styles.eventText}>{events[hour]}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Enregistrer</Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Entrer un évènement</Text>
              <TextInput
                style={styles.modalInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Votre texte ici"
              />
              <TouchableOpacity style={styles.modalButton} onPress={handleSaveText}>
                <Text style={styles.modalButtonText}>Valider</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff', paddingBottom: Platform.OS === 'web' ? 0 : 35 },
  scroll: { paddingHorizontal: 20, paddingBottom: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingTop: 20, height: 70, paddingHorizontal: 10 },
  backButton: { paddingRight: 10 },
  backIcon: { width: 24, height: 24, resizeMode: 'contain' },
  headerCenter: { flex: 1, alignItems: 'center' },
  centeredTitle: { fontSize: 24, fontWeight: 'bold', color: '#929292' },
  dateText: { fontSize: 18, color: '#E6770F', fontWeight: 'bold', marginTop: 16, marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  timeSlot: { width: '30%', marginBottom: 12, borderWidth: 1, borderColor: '#388AA8', padding: 10, borderRadius: 6, alignItems: 'center' },
  timeSlotText: { color: '#388AA8', fontWeight: 'bold' },
  eventBox: { marginTop: 5, backgroundColor: '#DFF6FF', padding: 5, borderRadius: 4 },
  eventText: { fontSize: 12, color: '#000' },
  saveButton: { backgroundColor: '#388AA8', borderRadius: 30, paddingVertical: 12, paddingHorizontal: 60, alignSelf: 'center', marginTop: 20 },
  saveButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' },
  modalTitle: { fontSize: 18, marginBottom: 10 },
  modalInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
  modalButton: { backgroundColor: '#388AA8', padding: 10, borderRadius: 5 },
  modalButtonText: { color: 'white', textAlign: 'center' },
});