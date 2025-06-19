import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

export default function MyListTile({ title, subTitle }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: theme.textColor }]}>{title}</Text>
        <Text style={[styles.subTitle, { color: theme.onSecondary }]}>{subTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  innerContainer: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    marginTop: 5,
  },
});


