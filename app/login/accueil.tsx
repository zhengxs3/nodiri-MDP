import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* 🔴 顶部标题 + 更多按钮 */}
        <View style={styles.headerRow}>
            <Text style={styles.centeredTitle}>Routine du jour</Text>

            <TouchableOpacity style={styles.menuButton} onPress={() => console.log('Menu')}>
                <Image
                source={require('@/assets/images/3points.png')}
                style={{ width: 24, height: 24 }}
                />
            </TouchableOpacity>
        </View>



        {/* Routine 内容 */}
        <View style={styles.grid}>
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/img1reveiller.png')} style={styles.icon} />
            <Text style={styles.cardLabel}>Se réveiller</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/img1dejeuner.png')} style={styles.icon} />
            <Text style={styles.cardLabel}>Déjeuner</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/img1toilette.png')} style={styles.icon} />
            <Text style={styles.cardLabel}>Faire sa toilette</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/img1habiller.png')} style={styles.icon} />
            <Text style={styles.cardLabel}>S’habiller</Text>
          </TouchableOpacity>
        </View>

        {/* 🟩 Boîte à outils：点击跳转 */}
        <TouchableOpacity onPress={() => router.push('/boite')}>
          <Text style={styles.sectionTitle}>Boîte à outils</Text>
        </TouchableOpacity>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/img2emotion.png')} style={styles.icon} />
            <Text style={styles.cardLabel}>Les émotions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/img2motmagique.png')} style={styles.icon} />
            <Text style={styles.cardLabel}>Les mots magiques</Text>
          </TouchableOpacity>
        </View>

        {/* 🟩 Apprentissage：点击跳转 */}
        <TouchableOpacity onPress={() => router.push('/apprentissage')}>
          <Text style={styles.sectionTitle}>Apprentissage</Text>
        </TouchableOpacity>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/img3regleclasse.png')} style={styles.icon} />
            <Text style={styles.cardLabel}>Règles de classe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/img3consigne.png')} style={styles.icon} />
            <Text style={styles.cardLabel}>Les consignes</Text>
          </TouchableOpacity>
        </View>

        
      </ScrollView>
      {/* 🔴 底部导航栏（已上移） */}
        <View style={styles.tabBar}>
          <Image source={require('@/assets/images/Group 182.png')} style={styles.tabIcon} />
          <Image source={require('@/assets/images/Group 181.png')} style={styles.tabIcon} />
          <Image source={require('@/assets/images/Group 179.png')} style={styles.tabIcon} />
          <Image source={require('@/assets/images/Group 180.png')} style={styles.tabIcon} />
          <Image source={require('@/assets/images/Group 178.png')} style={styles.tabIcon} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 35,
  },
  scroll: {
    paddingTop: 30,
    paddingVertical: 20,
    paddingHorizontal: 16,
    
  },
  headerRow: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginBottom: 20,
    },

    centeredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F7C8D',
    },

    menuButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 5,
    },

  sectionTitle: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2F7C8D',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#2F7C8D',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  cardLabel: {
    marginTop: 8,
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  tabIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
