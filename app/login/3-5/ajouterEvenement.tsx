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

export default function AjouterEvenement() {
  const router = useRouter();
  const [selectedCards, setSelectedCards] = useState([null, null, null, null]);

  const handleCardPress = (image, label) => {
    const nextIndex = selectedCards.findIndex((c) => c === null);
    if (nextIndex === -1) return;
    const updated = [...selectedCards];
    updated[nextIndex] = { image, label };
    setSelectedCards(updated);
  };

  const handleSlotPress = (index) => {
    const updated = [...selectedCards];
    updated[index] = null;
    setSelectedCards(updated);
  };

  const handleSave = () => {
    const filtered = selectedCards.filter(c => c !== null);
    const labels = filtered.map(item => item.label);

    router.replace({
      pathname: '/login/3-5/routine',
      params: {
        data: JSON.stringify(labels),
      }
    });
  };

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

          <View style={styles.table}>
            {Array.from({ length: 4 }).map((_, index) => (
              <View key={index} style={styles.tableRow}>
                <TouchableOpacity style={styles.leftCell} onPress={() => handleSlotPress(index)}>
                  {selectedCards[index] && (
                    <Image source={selectedCards[index].image} style={styles.icon} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.rightCell} onPress={() => handleSlotPress(index)}>
                  {selectedCards[index] && (
                    <Text style={{ padding: 10 }}>{selectedCards[index].label}</Text>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.grid}>
            {[{
              image: require('@/assets/images/imgAppliNodiri/3-5 ans/Routine/Routine 1.png'),
              label: 'Se réveiller'
            }, {
              image: require('@/assets/images/imgAppliNodiri/3-5 ans/Routine/Routine 7.png'),
              label: 'Déjeuner'
            }, {
              image: require('@/assets/images/imgAppliNodiri/3-5 ans/Routine/Routine 3.png'),
              label: 'Faire sa toilette'
            }, {
              image: require('@/assets/images/imgAppliNodiri/3-5 ans/Routine/Routine 5.png'),
              label: 'S’habiller'
            }].map((item, index) => (
              <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardPress(item.image, item.label)}>
                <Image source={item.image} style={styles.cardIcon} />
                <Text style={styles.cardLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Enregistrer</Text>
          </TouchableOpacity>
        </ScrollView>
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
  table: { borderWidth: 1, borderColor: '#000', borderRadius: 12, overflow: 'hidden', marginBottom: 20 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000', backgroundColor: '#fff' },
  leftCell: { width: 70, height: 70, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: '#000' },
  rightCell: { flex: 1, height: 70, justifyContent: 'center' },
  icon: { width: 70, height: 70, resizeMode: 'contain' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  card: { width: '47%', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  cardIcon: { width: 145, height: 145, borderRadius: 12, resizeMode: 'contain' },
  cardLabel: { marginTop: 8, color: '#000', fontSize: 16, textAlign: 'center' },
  saveButton: { backgroundColor: '#388AA8', borderRadius: 30, paddingVertical: 12, paddingHorizontal: 60, alignSelf: 'center' },
  saveButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
