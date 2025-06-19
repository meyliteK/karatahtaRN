// import { collection, onSnapshot } from 'firebase/firestore';
// import React, { useContext, useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
// import MyListTile from '../components/my_list_tile';
// import { db } from '../firebase';
// import { ThemeContext } from '../theme/ThemeContext';

// export default function UsersPage() {
//   const { theme } = useContext(ThemeContext);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'Users'), (snapshot) => {
//       const fetchedUsers = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setUsers(fetchedUsers);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   return (
//     <View style={[styles.container, { backgroundColor: theme.surface }]}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Kullanıcılar</Text>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color={theme.tertiary} />
//       ) : (
//         <FlatList
//           data={users}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <MyListTile
//               title={item.username}
//               subTitle={item.username}
//             />
//           )}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     backgroundColor: '#F36595',
//     padding: 20,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000',
//   },
// });
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { ThemeContext } from '../theme/ThemeContext';
import MyListTile from '../components/my_list_tile';

// Yardımcı fonksiyon: süre hesaplama
const timeAgo = (timestamp) => {
  if (!timestamp) return 'Bilinmiyor';
  
  const now = new Date();
  const lastOnlineDate = timestamp.toDate();
  const diffMs = now - lastOnlineDate;
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return 'Az önce çevrimiçiydi';
  if (diffMinutes < 60) return `${diffMinutes} dk önce çevrimiçiydi`;
  if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} saat önce çevrimiçiydi`;
  
  return `${Math.floor(diffMinutes / 1440)} gün önce çevrimiçiydi`;
};

export default function UsersPage() {
  const { theme } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Users'), (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {loading ? (
        <ActivityIndicator size="large" color={theme.inversePrimary} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MyListTile
              title={item.username}
              subTitle={item.isOnline ? 'Çevrimiçi🟢' : timeAgo(item.lastOnline)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
});

