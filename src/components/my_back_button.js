import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

export default function MyBackButton() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={[styles.container, { backgroundColor: theme.primary }]}>
        <Ionicons name="arrow-back" size={24} color={theme.inversePrimary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 50,
  },
});
