import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useState } from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

SplashScreen.preventAutoHideAsync();

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

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.wrapper} onLayout={onLayoutRootView}>
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
  // Exemple de styles existants (remplace ou ajoute ceux que tu avais déjà)
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  scroll: {
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  centeredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    transform: [{ rotate: '0deg' }],
  },
  iconCollapsed: {
    transform: [{ rotate: '-90deg' }],
  },
  subSection: {
    marginTop: 12,
    marginBottom: 12,
    paddingLeft: 10,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  smallArrow: {
    width: 16,
    height: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  toggleActive: {
    backgroundColor: '#388AA8',
  },
  toggleText: {
    fontSize: 14,
  },
  toggleTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  toggleTextInactive: {
    color: '#000',
  },
  sliderContainer: {
    marginTop: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 8,
  },
  forgotPassword: {
    color: '#007f7f',
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'right',
  },
  saveSubButton: {
    backgroundColor: '#388AA8',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  saveSubButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#007f7f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

