// import { collection, onSnapshot, query, where } from 'firebase/firestore';
// import React, { useContext, useEffect, useState } from 'react';
// import { FlatList, StyleSheet, Text, View } from 'react-native';
// import { auth, db } from '../firebase';
// import { ThemeContext } from '../theme/ThemeContext';

// export default function PostsPage() {
//   const { theme } = useContext(ThemeContext);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const postsRef = collection(db, 'User Posts');
//     const q = query(postsRef, where('UserEmail', '==', auth.currentUser.email));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const fetchedPosts = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setPosts(fetchedPosts);
//     });
//     return unsubscribe;
//   }, []);

//   return (
//     <View style={[styles.container, { backgroundColor: theme.surface }]}>
//       <View style={[styles.header, { backgroundColor: theme.tertiary }]}>
//         <Text style={styles.title}>Gönderilerim</Text>
//       </View>

//       {posts.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyText}>Henüz bir gönderi yapmadınız.</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={posts}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={[styles.postContainer, { backgroundColor: theme.secondary }]}>
//               <Text style={[styles.postText, { color: theme.onSecondary || '#fff' }]}>{item.PostMessage}</Text>
//               <Text style={styles.dateText}>
//                 Tarih: {item.TimeStamp?.toDate()?.toLocaleString() || 'Zaman bilgisi yok'}
//               </Text>
//             </View>
//           )}
//           contentContainerStyle={{ padding: 10 }}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: { padding: 15, alignItems: 'center' },
//   title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
//   postContainer: { borderRadius: 8, padding: 15, marginBottom: 10 },
//   postText: { fontSize: 16, fontWeight: 'bold' },
//   dateText: { fontSize: 12, color: '#999', marginTop: 5 },
//   emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   emptyText: { fontSize: 16, color: '#999' },
// });
// import { collection, onSnapshot, query, where } from 'firebase/firestore';
// import React, { useContext, useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
// import { auth, db } from '../firebase';
// import { ThemeContext } from '../theme/ThemeContext';

// export default function PostsPage() {
//   const { theme } = useContext(ThemeContext);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const currentUserEmail = auth.currentUser.email;

//   useEffect(() => {
//     const q = query(collection(db, 'User Posts'), where('UserEmail', '==', currentUserEmail));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const userPosts = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setPosts(userPosts);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   return (
//     <View style={[styles.container, { backgroundColor: theme.surface }]}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Gönderilerim</Text>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color={theme.tertiary} />
//       ) : posts.length === 0 ? (
//         <Text style={styles.noPostsText}>Henüz bir gönderi yapmadınız.</Text>
//       ) : (
//         <FlatList
//           data={posts}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={[styles.postContainer, { backgroundColor: theme.secondary }]}>
//               <Text style={styles.postText}>{item.PostMessage}</Text>
//               <Text style={styles.postDate}>
//                 Tarih: {item.TimeStamp ? new Date(item.TimeStamp.seconds * 1000).toLocaleString() : 'Zaman bilgisi yok'}
//               </Text>
//             </View>
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
//   noPostsText: {
//     margin: 20,
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   postContainer: {
//     borderRadius: 12,
//     padding: 15,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   postText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   postDate: {
//     fontSize: 14,
//     color: '#555',
//   },
// });
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import MyTextBox from '../components/text_box';
import { ThemeContext } from '../theme/ThemeContext';
import { AuthContext } from '../context/AuthContext';

export default function PostsPage() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'User Posts'), where('UserEmail', '==', user.email));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {loading ? (
        <ActivityIndicator size="large" color={theme.inversePrimary} />
      ) : posts.length === 0 ? (
        <Text style={[styles.noPosts, { color: theme.textColor }]}>Henüz bir gönderiniz yok.</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MyTextBox
              sectionName="Gönderi"
              text={`${item.PostMessage}\n\nTarih: ${item.TimeStamp?.toDate()?.toLocaleString() || ''}`}
              onPressed={() => {}}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  noPosts: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
  },
});

