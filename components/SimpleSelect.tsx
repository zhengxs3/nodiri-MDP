import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

type Option = { label: string; value: string };

export default function SimpleSelect({
  label,
  selected,
  onSelect,
  options,
  required = false,
}: {
  label: string;
  selected: string;
  onSelect: (value: string) => void;
  options: Option[];
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const currentLabel =
    options.find((opt) => opt.value === selected)?.label || 'Sélectionner -';

  const showText = `${label}${required ? ' *' : ''}`;

  // 👉 App 端使用 Modal + Touchable 模拟下拉选择
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{showText}</Text>

      <TouchableOpacity style={styles.selectBox} onPress={() => setOpen(true)}>
        <Text>{currentLabel}</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.modal}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item.value);
                    setOpen(false);
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 5,
    marginLeft: 4,
  },
  select: {
    width: '100%',
    height: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderColor: '#333',
    borderWidth: 1,
    fontSize: 14,
    backgroundColor: 'white',
  },
  selectBox: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrow: {
    fontSize: 12,
    color: '#666',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
});
