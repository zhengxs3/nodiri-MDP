import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  onClose: () => void;
};

export default function PopupMenu({ onClose }: Props) {
  const router = useRouter();

  return (
    <View style={styles.popupMenu} onStartShouldSetResponder={() => true}>
      <TouchableOpacity onPress={() => router.push('/login/aide')}>
        <Text style={styles.menuItem}>Aide</Text>
      </TouchableOpacity>
      <View style={styles.menuSeparator} />
      <TouchableOpacity onPress={() => router.push('/login/parametre')}>
        <Text style={styles.menuItem}>Paramètres</Text>
      </TouchableOpacity>
      <View style={styles.menuSeparator} />
      <TouchableOpacity
        onPress={() => {
          onClose();
          router.replace('/');
        }}
      >
        <Text style={[styles.menuItem, { color: '#E07A1F', fontWeight: 'bold' }]}>
          Se déconnecter
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  popupMenu: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 4,
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 4,
  },
});
