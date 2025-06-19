// import { Ionicons } from '@expo/vector-icons';
// import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
// import React, { useContext, useEffect, useState } from 'react';
// import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { auth, db } from '../firebase';
// import { ThemeContext } from '../theme/ThemeContext';

// export default function WallPost({ message, user, time, postId, likes }) {
//   const { theme } = useContext(ThemeContext);
//   const [isLiked, setIsLiked] = useState(likes.includes(auth.currentUser.email));
//   const [commentModal, setCommentModal] = useState(false);
//   const [commentText, setCommentText] = useState('');
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const q = query(collection(db, 'User Posts', postId, 'Comments'), orderBy('CommentTime', 'desc'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const fetchedComments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setComments(fetchedComments);
//     });
//     return unsubscribe;
//   }, []);

//   const toggleLike = async () => {
//     const postRef = doc(db, 'User Posts', postId);
//     if (isLiked) {
//       await updateDoc(postRef, { Likes: arrayRemove(auth.currentUser.email) });
//     } else {
//       await updateDoc(postRef, { Likes: arrayUnion(auth.currentUser.email) });
//     }
//     setIsLiked(!isLiked);
//   };

//   const addComment = async () => {
//     if (!commentText.trim()) return;

//     const userDoc = await getDoc(doc(db, 'Users', auth.currentUser.email));
//     const username = userDoc.data()?.username || auth.currentUser.email;

//     await addDoc(collection(db, 'User Posts', postId, 'Comments'), {
//       CommentText: commentText,
//       CommentedBy: username,
//       CommentTime: new Date()
//     });

//     setCommentText('');
//     setCommentModal(false);
//   };

//   const confirmDelete = () => {
//     Alert.alert('Gönderiyi Sil', 'Bu gönderiyi silmek istiyor musun?', [
//       { text: 'İptal', style: 'cancel' },
//       { text: 'Sil', style: 'destructive', onPress: deletePost }
//     ]);
//   };

//   const deletePost = async () => {
//     const commentsRef = collection(db, 'User Posts', postId, 'Comments');
//     const snapshot = await onSnapshot(commentsRef, () => {});
//     snapshot.forEach(async (docItem) => {
//       await deleteDoc(doc(db, 'User Posts', postId, 'Comments', docItem.id));
//     });
//     await deleteDoc(doc(db, 'User Posts', postId));
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: theme.primary }]}>
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.message}>{message}</Text>
//           <Text style={styles.sub}>{user} - {time}</Text>
//         </View>

//         {user === auth.currentUser.email && (
//           <TouchableOpacity onPress={confirmDelete}>
//             <Ionicons name="close-circle" size={24} color="grey" />
//           </TouchableOpacity>
//         )}
//       </View>

//       <View style={styles.actions}>
//         <TouchableOpacity onPress={toggleLike} style={styles.actionItem}>
//           <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={24} color={isLiked ? 'red' : 'grey'} />
//           <Text style={styles.actionText}>{likes.length + (isLiked && !likes.includes(auth.currentUser.email) ? 1 : 0)}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => setCommentModal(true)} style={styles.actionItem}>
//           <Ionicons name="chatbubble-outline" size={24} color="grey" />
//           <Text style={styles.actionText}>{comments.length}</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={comments}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.commentContainer}>
//             <Text>{item.CommentText}</Text>
//             <Text style={styles.commentSub}>{item.CommentedBy}</Text>
//           </View>
//         )}
//       />

//       {/* Yorum Modal */}
//       <Modal visible={commentModal} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TextInput
//               placeholder="Bir yorum ekle..."
//               value={commentText}
//               onChangeText={setCommentText}
//               style={styles.commentInput}
//             />
//             <View style={styles.modalButtons}>
//               <TouchableOpacity onPress={() => setCommentModal(false)}>
//                 <Text style={{ color: 'grey' }}>İptal</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={addComment}>
//                 <Text style={{ color: theme.tertiary }}>Gönder</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { marginVertical: 10, padding: 15, borderRadius: 8 },
//   header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
//   message: { fontSize: 16, fontWeight: 'bold' },
//   sub: { fontSize: 12, color: '#999' },
//   actions: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
//   actionItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 },
//   actionText: { marginLeft: 5, color: '#999' },
//   commentContainer: { marginVertical: 5 },
//   commentSub: { fontSize: 10, color: '#999' },

//   modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000088' },
//   modalContent: { width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10 },
//   commentInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 20 },
//   modalButtons: { flexDirection: 'row', justifyContent: 'flex-end' }
// });
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Alert, FlatList } from 'react-native';
// import { db, auth } from '../firebase';
// import { doc, updateDoc, arrayUnion, arrayRemove, collection, addDoc, serverTimestamp, onSnapshot, deleteDoc, getDocs } from 'firebase/firestore';
// import LikeButton from './like_button';
// import DeleteButton from './delete_button';
// import CommentButton from './comment_button';

// export default function WallPost({ message, user, time, postId, likes }) {
//   const currentUser = auth.currentUser.email;
//   const [isLiked, setIsLiked] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [commentText, setCommentText] = useState('');

//   useEffect(() => {
//     setIsLiked(likes.includes(currentUser));
//   }, [likes]);

//   useEffect(() => {
//     const commentsRef = collection(db, 'User Posts', postId, 'Comments');
//     const unsubscribe = onSnapshot(commentsRef, snapshot => {
//       const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setComments(data);
//     });
//     return unsubscribe;
//   }, []);

//   const toggleLike = async () => {
//     const postRef = doc(db, 'User Posts', postId);
//     if (isLiked) {
//       await updateDoc(postRef, { Likes: arrayRemove(currentUser) });
//     } else {
//       await updateDoc(postRef, { Likes: arrayUnion(currentUser) });
//     }
//     setIsLiked(!isLiked);
//   };

//   const addComment = async () => {
//     if (commentText.trim() === '') return;
//     const commentsRef = collection(db, 'User Posts', postId, 'Comments');
//     await addDoc(commentsRef, {
//       CommentText: commentText,
//       CommentedBy: currentUser,
//       CommentTime: serverTimestamp(),
//     });
//     setCommentText('');
//     setModalVisible(false);
//   };

//   const deletePost = async () => {
//     const commentsRef = collection(db, 'User Posts', postId, 'Comments');
//     const commentsSnapshot = await getDocs(commentsRef);
//     commentsSnapshot.forEach(async docItem => {
//       await deleteDoc(doc(db, 'User Posts', postId, 'Comments', docItem.id));
//     });

//     await deleteDoc(doc(db, 'User Posts', postId));
//   };

//   return (
//     <View style={styles.postContainer}>
//       <View style={styles.postHeader}>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.message}>{message}</Text>
//           <Text style={styles.user}>{user} - {time}</Text>
//         </View>
//         {user === currentUser && <DeleteButton onPress={deletePost} />}
//       </View>

//       <View style={styles.postActions}>
//         <View style={styles.actionItem}>
//           <LikeButton isLiked={isLiked} onPress={toggleLike} />
//           <Text style={styles.countText}>{likes.length}</Text>
//         </View>

//         <View style={styles.actionItem}>
//           <CommentButton onPress={() => setModalVisible(true)} />
//           <Text style={styles.countText}>{comments.length}</Text>
//         </View>
//       </View>

//       <FlatList
//         data={comments}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.commentContainer}>
//             <Text style={styles.commentText}>{item.CommentText}</Text>
//             <Text style={styles.commentMeta}>{item.CommentedBy}</Text>
//           </View>
//         )}
//       />

//       {/* Yorum Ekleme Modalı */}
//       <Modal visible={modalVisible} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TextInput
//               placeholder="Bir yorum yaz..."
//               style={styles.modalInput}
//               value={commentText}
//               onChangeText={setCommentText}
//             />
//             <TouchableOpacity onPress={addComment} style={styles.modalButton}>
//               <Text style={styles.modalButtonText}>Gönder</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => setModalVisible(false)}>
//               <Text style={styles.cancelText}>İptal</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   postContainer: {
//     backgroundColor: '#eee',
//     margin: 10,
//     padding: 15,
//     borderRadius: 10,
//   },
//   postHeader: { flexDirection: 'row', marginBottom: 10 },
//   message: { fontSize: 16 },
//   user: { fontSize: 12, color: 'gray' },
//   postActions: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
//   actionItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 },
//   countText: { marginLeft: 5, color: 'gray' },
//   commentContainer: { marginTop: 5 },
//   commentText: { fontSize: 14 },
//   commentMeta: { fontSize: 12, color: 'gray' },
//   modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' },
//   modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' },
//   modalInput: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 10 },
//   modalButton: { backgroundColor: '#f36595', padding: 10, borderRadius: 10, alignItems: 'center' },
//   modalButtonText: { color: 'white' },
//   cancelText: { marginTop: 10, textAlign: 'center', color: 'gray' },
// });

import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebase';
import { ThemeContext } from '../theme/ThemeContext';
import { doc, updateDoc, arrayUnion, arrayRemove, collection, onSnapshot, query, orderBy, deleteDoc, getDocs } from 'firebase/firestore';
import Comment from './comment';
import LikeButton from './like_button';
import DeleteButton from './delete_button';
import CommentButton from './comment_button';
import { AuthContext } from '../context/AuthContext';
import { Alert } from 'react-native';


export default function WallPost({ postId, message, user, userEmail, time, likes, onCommentPress }) {
  const { theme } = useContext(ThemeContext);
  const { user: currentUser } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(likes.includes(currentUser.email));
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'User Posts', postId, 'Comments'), orderBy('CommentTime', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentData);
    });

    return unsubscribe;
  }, []);

  const toggleLike = async () => {
    const postRef = doc(db, 'User Posts', postId);
    if (isLiked) {
      await updateDoc(postRef, { Likes: arrayRemove(currentUser.email) });
      setIsLiked(false);
    } else {
      await updateDoc(postRef, { Likes: arrayUnion(currentUser.email) });
      setIsLiked(true);
    }
  };

  const deletePost = () => {
  Alert.alert(
    "Gönderiyi Sil",
    "Bu gönderiyi silmek istediğinizden emin misiniz?",
    [
      {
        text: "İptal",
        style: "cancel"
      },
      {
        text: "Evet",
        style: "destructive",
        onPress: async () => {
          const commentsRef = collection(db, 'User Posts', postId, 'Comments');
          const commentsSnap = await getDocs(commentsRef);
          for (let docSnap of commentsSnap.docs) {
            await deleteDoc(docSnap.ref);
          }
          await deleteDoc(doc(db, 'User Posts', postId));
        }
      }
    ]
  );
};


  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={[styles.message, { color: theme.textColor }]}>{message}</Text>
          <View style={styles.meta}>
            <Text style={[styles.metaText, { color: theme.onSecondary }]}>{user}</Text>
            <Text style={[styles.metaText, { color: theme.onSecondary }]}> - {time}</Text>
          </View>
        </View>

        {currentUser?.email === userEmail && (
          <DeleteButton onPress={deletePost} />
        )}
      </View>

      <View style={styles.actions}>
        <View style={styles.likeContainer}>
          <LikeButton isLiked={isLiked} onPress={toggleLike} />
          <Text style={[styles.likeText, { color: theme.onSecondary }]}>{likes.length}</Text>
        </View>

        <View style={styles.commentContainer}>
          <TouchableOpacity onPress={() => onCommentPress(postId)}>
            <CommentButton />
          </TouchableOpacity>
          <Text style={[styles.likeText, { color: theme.onSecondary }]}>{comments.length}</Text>
        </View>
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Comment
            text={item.CommentText}
            user={item.CommentedBy}
            time={new Date(item.CommentTime?.seconds * 1000).toLocaleString()}
          />
        )}
        style={{ marginTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 25,
    padding: 20,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  textContainer: { flex: 1 },
  message: { fontSize: 16 },
  meta: { flexDirection: 'row', marginTop: 5 },
  metaText: { fontSize: 13 },
  actions: { flexDirection: 'row', justifyContent: 'center', marginTop: 15 },
  likeContainer: { alignItems: 'center', marginRight: 40 },
  commentContainer: { alignItems: 'center' },
  likeText: { marginTop: 5, fontSize: 12 },
});







