// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';
// import { StyleSheet, TouchableOpacity } from 'react-native';

// export default function LikeButton({ isLiked, onTap }) {
//   return (
//     <TouchableOpacity onPress={onTap} style={styles.button}>
//       <Ionicons
//         name={isLiked ? 'heart' : 'heart-outline'}
//         size={24}
//         color={isLiked ? 'red' : 'grey'}
//       />
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

export default function LikeButton({ isLiked, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name={isLiked ? 'heart' : 'heart-outline'}
        size={28}
        color={isLiked ? 'red' : 'gray'}
      />
    </TouchableOpacity>
  );
}
