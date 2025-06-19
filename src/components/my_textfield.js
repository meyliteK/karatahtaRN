// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';
// import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

// export default function MyTextField({
//   hintText,
//   obscureText,
//   value,
//   onChangeText,
//   prefixIcon,
//   suffixIcon,
//   onSuffixTap
// }) {
//   return (
//     <View style={styles.container}>
//       {prefixIcon && (
//         <Ionicons name={prefixIcon} size={24} color="grey" style={styles.icon} />
//       )}
//       <TextInput
//         style={styles.input}
//         placeholder={hintText}
//         placeholderTextColor="grey"
//         secureTextEntry={obscureText}
//         value={value}
//         onChangeText={onChangeText}
//       />
//       {suffixIcon && (
//         <TouchableOpacity onPress={onSuffixTap}>
//           <Ionicons name={suffixIcon} size={24} color="grey" style={styles.icon} />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 12,
//     paddingHorizontal: 10,
//     marginVertical: 8,
//     alignItems: 'center',
//   },
//   input: {
//     flex: 1,
//     padding: 15,
//     color: '#000',
//   },
//   icon: {
//     marginHorizontal: 5,
//   },
// });

import React, { useContext } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../theme/ThemeContext';

export default function MyTextField({
  hintText,
  obscureText,
  value,
  onChangeText,
  prefixIcon,
  suffixIcon,
  onSuffixPress
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      {prefixIcon && (
        <Ionicons name={prefixIcon} size={24} color={theme.onSecondary} style={styles.icon} />
      )}

      <TextInput
        style={[styles.input, { color: theme.textColor }]}
        placeholder={hintText}
        placeholderTextColor={theme.onSecondary}
        secureTextEntry={obscureText}
        value={value}
        onChangeText={onChangeText}
      />

      {suffixIcon && (
        <TouchableOpacity onPress={onSuffixPress}>
          <Ionicons name={suffixIcon} size={24} color={theme.onSecondary} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
});

