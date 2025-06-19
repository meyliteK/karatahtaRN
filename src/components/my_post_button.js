import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

export default function MyPostButton({ onPress }) {
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { backgroundColor: theme.secondary }]}>
        <Ionicons name="checkmark" size={24} color={theme.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginLeft: 10,
    borderRadius: 12,
  },
});
