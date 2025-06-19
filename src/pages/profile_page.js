// import { Ionicons } from '@expo/vector-icons';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import React, { useContext, useEffect, useState } from 'react';
// import { ActivityIndicator, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { auth, db } from '../firebase';
// import { ThemeContext } from '../theme/ThemeContext';

// export default function ProfilePage() {
//   const { theme } = useContext(ThemeContext);
//   const currentUser = auth.currentUser;
//   const [userData, setUserData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [editModal, setEditModal] = useState(false);
//   const [fieldName, setFieldName] = useState('');
//   const [fieldValue, setFieldValue] = useState('');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userDoc = await getDoc(doc(db, 'Users', currentUser.email));
//       if (userDoc.exists()) {
//         setUserData(userDoc.data());
//       }
//       setLoading(false);
//     };
//     fetchUserData();
//   }, []);

//   const editField = async () => {
//     if (fieldValue.trim() !== '') {
//       await updateDoc(doc(db, 'Users', currentUser.email), {
//         [fieldName]: fieldValue
//       });
//       setUserData({ ...userData, [fieldName]: fieldValue });
//     }
//     setEditModal(false);
//   };

//   if (loading) {
//     return (
//       <View style={[styles.container, { backgroundColor: theme.surface }]}>
//         <ActivityIndicator size="large" color={theme.tertiary} />
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { backgroundColor: theme.surface }]}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Profil</Text>
//       </View>

//       <View style={styles.profileInfo}>
//         <Ionicons name="person-circle" size={72} color={theme.tertiary} />
//         <Text style={styles.emailText}>{currentUser.email}</Text>
//       </View>

//       <View style={styles.detailSection}>
//         <Text style={styles.sectionLabel}>Detaylar</Text>

//         <TouchableOpacity onPress={() => { setFieldName('username'); setFieldValue(userData.username); setEditModal(true); }}>
//           <View style={[styles.detailBox, { backgroundColor: theme.primary }]}>
//             <Text style={styles.label}>Kullanıcı Adı:</Text>
//             <Text>{userData.username}</Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => { setFieldName('bio'); setFieldValue(userData.bio); setEditModal(true); }}>
//           <View style={[styles.detailBox, { backgroundColor: theme.primary }]}>
//             <Text style={styles.label}>Biyografi:</Text>
//             <Text>{userData.bio}</Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       {/* Düzenleme Modalı */}
//       <Modal visible={editModal} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={[styles.modalContent, { backgroundColor: theme.surface }]}>
//             <Text style={styles.modalTitle}>{fieldName} düzenle</Text>
//             <TextInput
//               style={styles.input}
//               value={fieldValue}
//               onChangeText={setFieldValue}
//               placeholder={`Yeni ${fieldName}`}
//             />
//             <View style={styles.modalButtons}>
//               <TouchableOpacity onPress={() => setEditModal(false)}>
//                 <Text style={styles.cancelButton}>İptal</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={editField}>
//                 <Text style={styles.saveButton}>Kaydet</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
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
//   profileInfo: {
//     alignItems: 'center',
//     marginTop: 30,
//   },
//   emailText: {
//     fontSize: 14,
//     marginTop: 5,
//   },
//   detailSection: {
//     marginTop: 40,
//     paddingHorizontal: 20,
//   },
//   sectionLabel: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: '#555',
//   },
//   detailBox: {
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   label: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#00000088',
//   },
//   modalContent: {
//     width: '80%',
//     borderRadius: 10,
//     padding: 20,
//   },
//   modalTitle: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     marginBottom: 15,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//     paddingVertical: 8,
//     marginBottom: 20,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   cancelButton: {
//     marginRight: 20,
//     color: '#999',
//   },
//   saveButton: {
//     color: '#F36595',
//   },
// });
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ThemeContext } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { Alert } from 'react-native';


export default function ProfilePage() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [fieldToEdit, setFieldToEdit] = useState(null);
  const [newValue, setNewValue] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    if (!user) return;
    const docRef = doc(db, 'Users', user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleSave = () => {
  if (newValue.trim() === '' || !user) return;

  Alert.alert(
    "Güncelleme",
    `"${fieldToEdit}" bilgisini gerçekten değiştirmek istiyor musunuz?`,
    [
      {
        text: "Hayır",
        style: "cancel"
      },
      {
        text: "Evet",
        style: "default",
        onPress: async () => {
          const docRef = doc(db, 'Users', user.email);
          await updateDoc(docRef, { [fieldToEdit]: newValue });
          fetchUserData();
          setFieldToEdit(null);
          setNewValue('');
        }
      }
    ]
  );
};


  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {loading ? (
        <ActivityIndicator size="large" color={theme.inversePrimary} />
      ) : (
        <View style={styles.content}>
          <Ionicons name="person-circle" size={72} color={theme.inversePrimary} style={{ alignSelf: 'center' }} />
          <Text style={[styles.email, { color: theme.textColor }]}>{user?.email}</Text>

          <View style={styles.infoContainer}>
            <Text style={[styles.infoLabel, { color: theme.textColor }]}>Kullanıcı Adı:</Text>
            <View style={styles.infoRow}>
              <Text style={[styles.infoText, { color: theme.textColor }]}>{userData?.username || 'Yok'}</Text>
              <TouchableOpacity onPress={() => { setFieldToEdit('username'); setNewValue(userData?.username); }}>
                <Ionicons name="create-outline" size={20} color={theme.inversePrimary} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.infoLabel, { color: theme.textColor }]}>Biyografi:</Text>
            <View style={styles.infoRow}>
              <Text style={[styles.infoText, { color: theme.textColor }]}>{userData?.bio || 'Boş biyografi'}</Text>
              <TouchableOpacity onPress={() => { setFieldToEdit('bio'); setNewValue(userData?.bio); }}>
                <Ionicons name="create-outline" size={20} color={theme.inversePrimary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Edit Modal */}
      <Modal visible={fieldToEdit !== null} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.primary }]}>
            <Text style={[styles.modalTitle, { color: theme.textColor }]}>{fieldToEdit} düzenle</Text>
            <TextInput
              value={newValue}
              onChangeText={setNewValue}
              style={[styles.modalInput, { color: theme.textColor, borderColor: theme.inverseSurface }]}
              placeholder={`Yeni ${fieldToEdit}`}
              placeholderTextColor={'gray'}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setFieldToEdit(null)}>
                <Text style={styles.cancelText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <Text style={[styles.saveText, { color: theme.tertiary }]}>Kaydet</Text>
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
  content: { padding: 20 },
  email: { textAlign: 'center', marginVertical: 10, fontSize: 16 },
  infoContainer: { marginTop: 20 },
  infoLabel: { fontWeight: 'bold', fontSize: 16, marginTop: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  infoText: { fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' },
  modalContent: { padding: 20, borderRadius: 10, width: '80%' },
  modalTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  modalInput: { borderBottomWidth: 1, marginBottom: 20, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelText: { color: 'gray', fontSize: 16 },
  saveText: { fontSize: 16, fontWeight: 'bold' },
});



