import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';
import Slider from '@react-native-community/slider';
import AppLoading from 'expo-app-loading';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function SettingsSection({ title, children, large = true }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Image
          source={
            large
              ? require('@/assets/images/Group 38.png')
              : require('@/assets/images/Group 40.png')
          }
          style={[styles.arrowIcon, !expanded && styles.iconCollapsed]}
        />
      </TouchableOpacity>
      {expanded && <View>{children}</View>}
    </View>
  );
}

function SubSettingsSection({ title, children }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <View style={styles.subSection}>
      <TouchableOpacity
        style={styles.subHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.label}>{title}</Text>
        <Image
          source={require('@/assets/images/Group 40.png')}
          style={[styles.smallArrow, !expanded && styles.iconCollapsed]}
        />
      </TouchableOpacity>
      {expanded && <View>{children}</View>}
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const [theme, setTheme] = useState('sombre');
  const [volume, setVolume] = useState(50);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoLogin, setAutoLogin] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [textSize, setTextSize] = useState(14);
  const [trackProgress, setTrackProgress] = useState(true);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Image source={require('@/assets/images/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.centeredTitle}>Paramètres</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <SettingsSection title="Général" large>
          <SubSettingsSection title="Thème visuel">
            <View style={styles.toggleRow}>
              {['sombre', 'clair'].map((val) => (
                <TouchableOpacity
                  key={val}
                  style={[styles.toggleButton, theme === val && styles.toggleActive]}
                  onPress={() => setTheme(val)}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      theme === val ? styles.toggleTextActive : styles.toggleTextInactive,
                    ]}
                  >
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </SubSettingsSection>

          <SubSettingsSection title="Son & volume">
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={volume}
                onValueChange={setVolume}
                minimumTrackTintColor="#388AA8"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#007f7f"
              />
              <Text style={styles.toggleText}>{volume}</Text>
            </View>
          </SubSettingsSection>

          <SubSettingsSection title="Notifications">
            <View style={styles.toggleRow}>
              {[true, false].map((val) => (
                <TouchableOpacity
                  key={val ? 'on' : 'off'}
                  style={[
                    styles.toggleButton,
                    notificationsEnabled === val && styles.toggleActive,
                  ]}
                  onPress={() => setNotificationsEnabled(val)}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      notificationsEnabled === val
                        ? styles.toggleTextActive
                        : styles.toggleTextInactive,
                    ]}
                  >
                    {val ? 'Activer' : 'Désactiver'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </SubSettingsSection>
        </SettingsSection>

        <SettingsSection title="Sécurité / confidentialité" large>
          <SubSettingsSection title="Contrôle parental">
            <TextInput style={styles.input} placeholder="Ancien mot de passe" secureTextEntry />
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
            <TextInput style={styles.input} placeholder="Nouveau mot de passe" secureTextEntry />
            <TouchableOpacity style={styles.saveSubButton}>
              <Text style={styles.saveSubButtonText}>Sauvegarder</Text>
            </TouchableOpacity>
          </SubSettingsSection>

          <SubSettingsSection title="Connexion automatique">
            <View style={styles.toggleRow}>
              {[true, false].map((val) => (
                <TouchableOpacity
                  key={val ? 'on' : 'off'}
                  style={[
                    styles.toggleButton,
                    autoLogin === val && styles.toggleActive,
                  ]}
                  onPress={() => setAutoLogin(val)}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      autoLogin === val ? styles.toggleTextActive : styles.toggleTextInactive,
                    ]}
                  >
                    {val ? 'Activer' : 'Désactiver'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </SubSettingsSection>
        </SettingsSection>

        <SettingsSection title="Profil" large>
          <SubSettingsSection title="Nom">
            <TextInput style={styles.input} placeholder="Modifier Nom" />
            <TouchableOpacity style={styles.saveSubButton}>
              <Text style={styles.saveSubButtonText}>Sauvegarder</Text>
            </TouchableOpacity>
          </SubSettingsSection>

          <SubSettingsSection title="Âge">
            <TextInput style={styles.input} placeholder="Modifier Âge" keyboardType="numeric" />
            <TouchableOpacity style={styles.saveSubButton}>
              <Text style={styles.saveSubButtonText}>Sauvegarder</Text>
            </TouchableOpacity>
          </SubSettingsSection>

          <SubSettingsSection title="Mot de passe">
            <TextInput style={styles.input} placeholder="Ancien mot de passe" secureTextEntry />
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
            <TextInput style={styles.input} placeholder="Nouveau mot de passe" secureTextEntry />
            <TouchableOpacity style={styles.saveSubButton}>
              <Text style={styles.saveSubButtonText}>Sauvegarder</Text>
            </TouchableOpacity>
          </SubSettingsSection>

          <SubSettingsSection title="Suivi des progrès">
            <View style={styles.toggleRow}>
              {[true, false].map((val) => (
                <TouchableOpacity
                  key={val ? 'on' : 'off'}
                  style={[
                    styles.toggleButton,
                    trackProgress === val && styles.toggleActive,
                  ]}
                  onPress={() => setTrackProgress(val)}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      trackProgress === val ? styles.toggleTextActive : styles.toggleTextInactive,
                    ]}
                  >
                    {val ? 'Activer' : 'Désactiver'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </SubSettingsSection>
        </SettingsSection>

        <SettingsSection title="Accessibilité" large>
          <SubSettingsSection title="Taille du texte">
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={volume}
                onValueChange={setVolume}
                minimumTrackTintColor="#388AA8"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#007f7f"
              />
              <Text style={styles.toggleText}>{volume}</Text>
            </View>
          </SubSettingsSection>

          <SubSettingsSection title="Lecture audio">
            <View style={styles.toggleRow}>
              {[true, false].map((val) => (
                <TouchableOpacity
                  key={val ? 'on' : 'off'}
                  style={[
                    styles.toggleButton,
                    audioEnabled === val && styles.toggleActive,
                  ]}
                  onPress={() => setAudioEnabled(val)}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      audioEnabled === val ? styles.toggleTextActive : styles.toggleTextInactive,
                    ]}
                  >
                    {val ? 'Activer' : 'Désactiver'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </SubSettingsSection>
        </SettingsSection>

        <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
          <Text style={styles.saveButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: Platform.OS === 'web' ? 0 : 45,
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
    fontFamily: 'Poppins_600SemiBold',
    color: '#388AA8',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  iconCollapsed: {
    transform: [{ rotate: '180deg' }],
  },
  subSection: {
    marginBottom: 0,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallArrow: {
    width: 16,
    height: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 5,
    marginTop: 5,
  },
  forgotPassword: {
    color: '#A4A4A4',
    fontSize: 12,
    marginBottom: 6,
    marginLeft: 4,
    fontFamily: 'Poppins_400Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 8,
    marginBottom: 5,
    fontFamily: 'Poppins_400Regular',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  toggleButton: {
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#388AA8',
    backgroundColor: 'transparent',
  },
  toggleActive: {
    backgroundColor: '#388AA8',
  },
  toggleText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  toggleTextActive: {
    color: '#fff',
  },
  toggleTextInactive: {
    color: '#388AA8',
  },
  saveSubButton: {
    backgroundColor: '#388AA8',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  saveSubButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Poppins_400Regular',
  },
  saveButton: {
    backgroundColor: '#388AA8',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 60,
    alignSelf: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  sliderContainer: {
    width: '100%',
  },
  slider: {
    width: '90%',
    height: 10,
  },
});
