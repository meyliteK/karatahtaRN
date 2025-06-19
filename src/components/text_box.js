import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

export default function MyTextBox({ text, sectionName, onPressed }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <View style={styles.row}>
        <Text style={[styles.sectionName, { color: theme.onSecondary }]}>{sectionName}</Text>

        <TouchableOpacity onPress={onPressed}>
          <Ionicons name="settings-outline" size={24} color={theme.inversePrimary} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.text, { color: theme.textColor }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 10,
    fontSize: 14,
  },
});

