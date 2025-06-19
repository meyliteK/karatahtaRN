// import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
// import React, { useContext, useEffect, useState } from 'react';
// import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import MyDrawer from '../components/MyDrawer';
// import WallPost from '../components/WallPost';
// import { auth, db } from '../firebase';
// import { ThemeContext } from '../theme/ThemeContext';

// export default function HomePage() {
//   const { theme } = useContext(ThemeContext);
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState('');

//   useEffect(() => {
//     const postsRef = collection(db, 'User Posts');
//     const q = query(postsRef, orderBy('TimeStamp', 'asc'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const fetchedPosts = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setPosts(fetchedPosts);
//     });
//     return unsubscribe;
//   }, []);

//   const handlePost = async () => {
//     if (!newPost.trim()) return;
//     await addDoc(collection(db, 'User Posts'), {
//       UserEmail: auth.currentUser.email,
//       PostMessage: newPost,
//       TimeStamp: serverTimestamp(),
//       Likes: [],
//     });
//     setNewPost('');
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: theme.surface }]}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Ana Sayfa</Text>
//       </View>

//       <FlatList
//         data={posts}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <WallPost
//             message={item.PostMessage}
//             user={item.UserEmail}
//             postId={item.id}
//             likes={item.Likes || []}
//             time={item.TimeStamp?.toDate()?.toLocaleDateString() || ''}
//           />
//         )}
//         contentContainerStyle={{ padding: 10 }}
//       />

//       <View style={styles.inputContainer}>
//         <TextInput
//           placeholder="Bir şeyler yaz..."
//           value={newPost}
//           onChangeText={setNewPost}
//           style={styles.input}
//         />
//         <TouchableOpacity onPress={handlePost} style={[styles.postButton, { backgroundColor: theme.tertiary }]}>
//           <Text style={{ color: 'white' }}>Paylaş</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.emailText}>{auth.currentUser.email} hesabıyla giriş yapıldı</Text>

//       <MyDrawer />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: { padding: 15, alignItems: 'center', backgroundColor: '#F36595' },
//   title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
//   inputContainer: { flexDirection: 'row', padding: 10 },
//   input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
//   postButton: { padding: 10, marginLeft: 5, borderRadius: 8 },
//   emailText: { textAlign: 'center', marginVertical: 10, color: '#666' }
// });
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Modal } from 'react-native';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import WallPost from '../components/wall_post';
import { ThemeContext } from '../theme/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function HomePage() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');
  const [loading, setLoading] = useState(true);

  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'User Posts'), orderBy('TimeStamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handlePost = async () => {
    if (postText.trim() === '') return;

    const userDoc = await getDoc(doc(db, 'Users', user.email));
    const username = userDoc.exists() ? userDoc.data().username : 'Bilinmeyen';

    await addDoc(collection(db, 'User Posts'), {
      UserEmail: user.email,
      Username: username,
      PostMessage: postText,
      TimeStamp: serverTimestamp(),
      Likes: [],
    });
    setPostText('');
  };

  const handleCommentSubmit = async () => {
    if (!selectedPostId || commentText.trim() === '') return;

    const userRef = doc(db, 'Users', user.email);
    const userSnap = await getDoc(userRef);
    const username = userSnap.exists() ? userSnap.data().username : 'Bilinmeyen';

    await addDoc(collection(db, 'User Posts', selectedPostId, 'Comments'), {
      CommentText: commentText,
      CommentedBy: username,
      CommentTime: new Date(),
    });

    setCommentText('');
    setCommentModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.inversePrimary} />
        ) : (
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <WallPost
                postId={item.id}
                message={item.PostMessage}
                user={item.Username}
                userEmail={item.UserEmail}
                likes={item.Likes || []}
                time={item.TimeStamp?.toDate()?.toLocaleString() || ''}
                onCommentPress={(postId) => {
                  setSelectedPostId(postId);
                  setCommentModalVisible(true);
                }}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

      <View style={styles.postInputContainer}>
        <TextInput
          style={[styles.input, { color: theme.textColor }]}
          placeholder="Bir şeyler yaz..."
          placeholderTextColor={theme.onSecondary}
          value={postText}
          onChangeText={setPostText}
        />
        <TouchableOpacity style={[styles.postButton, { backgroundColor: theme.tertiary }]} onPress={handlePost}>
          <Ionicons name="send" size={24} color={theme.inversePrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.onSecondary }]}>{user.email} hesabıyla giriş yapıldı</Text>
      </View>

      <Modal visible={commentModalVisible} transparent animationType="slide" onDismiss={() => setCommentText('')}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.primary }]}>
            <Text style={[styles.modalTitle, { color: theme.textColor }]}>Yorum Ekle</Text>
            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              style={[styles.modalInput, { color: theme.textColor }]}
              placeholder="Bir yorum yaz..."
              placeholderTextColor={theme.onSecondary}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setCommentModalVisible(false)}>
                <Text style={[styles.cancelText, { color: theme.onSecondary }]}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCommentSubmit}>
                <Text style={[styles.saveText, { color: theme.tertiary }]}>Gönder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  postInputContainer: { flexDirection: 'row', padding: 10, alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#eee', padding: 10, borderRadius: 10 },
  postButton: { padding: 10, borderRadius: 10, marginLeft: 10 },
  footer: { padding: 10, alignItems: 'center' },
  footerText: { fontSize: 12 },

  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' },
  modalContent: { padding: 20, borderRadius: 10, width: '80%' },
  modalTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  modalInput: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 20, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelText: { fontSize: 16 },
  saveText: { fontSize: 16, fontWeight: 'bold' },
});



