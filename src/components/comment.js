import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

export default function Comment({ text, user, time }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <Text style={[styles.commentText, { color: theme.textColor }]}>{text}</Text>
      <View style={styles.userRow}>
        <Text style={[styles.userText, { color: theme.onSecondary }]}>{user}</Text>
        <Text style={[styles.userText, { color: theme.onSecondary }]}> - {time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 15,
    marginBottom: 5,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  userRow: {
    flexDirection: 'row',
  },
  userText: {
    fontSize: 13,
  },
});

