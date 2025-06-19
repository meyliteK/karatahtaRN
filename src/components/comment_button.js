// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';
// import { StyleSheet, TouchableOpacity } from 'react-native';

// export default function CommentButton({ onTap }) {
//   return (
//     <TouchableOpacity onPress={onTap} style={styles.button}>
//       <Ionicons name="chatbubble-outline" size={24} color="grey" />
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     marginHorizontal: 10,
//   },
// });
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CommentButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="chatbubble-outline" size={28} color="gray" />
    </TouchableOpacity>
  );
}
