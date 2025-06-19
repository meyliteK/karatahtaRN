// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { signOut } from 'firebase/auth';
// import React, { useContext } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { auth } from '../firebase';
// import { ThemeContext } from '../theme/ThemeContext';

// export default function MyDrawer() {
//   const navigation = useNavigation();
//   const { theme } = useContext(ThemeContext); // TEMA BURADAN GELİYOR ✅

//   const logout = () => {
//     signOut(auth);
//   };

//   return (
//     <View style={[styles.drawer, { backgroundColor: theme.tertiary }]}>
//       <View style={styles.header}>
//         <Ionicons name="library" size={100} color="black" />
//       </View>

//       <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('HomePage')}>
//         <Ionicons name="home" size={24} color="black" style={styles.icon} />
//         <Text style={styles.text}>ANA SAYFA</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ProfilePage')}>
//         <Ionicons name="person" size={24} color="black" style={styles.icon} />
//         <Text style={styles.text}>PROFİL</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('UsersPage')}>
//         <Ionicons name="people" size={24} color="black" style={styles.icon} />
//         <Text style={styles.text}>KULLANICILAR</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('PostsPage')}>
//         <Ionicons name="create" size={24} color="black" style={styles.icon} />
//         <Text style={styles.text}>GÖNDERİLERİM</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={[styles.item, styles.logout]} onPress={logout}>
//         <Ionicons name="log-out" size={24} color="black" style={styles.icon} />
//         <Text style={styles.text}>ÇIKIŞ YAP</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   drawer: {
//     flex: 1,
//     paddingTop: 50,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//   },
//   icon: {
//     marginRight: 15,
//   },
//   text: {
//     fontSize: 16,
//   },
//   logout: {
//     position: 'absolute',
//     bottom: 30,
//     width: '100%',
//   },
// });
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from '../theme/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export default function MyDrawer() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const logout = async () => {
    if (user) {
      const userRef = doc(db, 'Users', user.email);
      await updateDoc(userRef, {
        isOnline: false,
        lastOnline: serverTimestamp(),
      });
    }
    await signOut(auth);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.tertiary }]}>
      <View style={styles.header}>
        <FontAwesome5 name="book" size={100} color="#000" />
      </View>

      <View style={styles.menu}>
        <DrawerItem
          icon={<Ionicons name="home" size={24} color="black" />}
          label="ANA SAYFA"
          onPress={() => navigation.navigate('HomePage')}
        />
        <DrawerItem
          icon={<Ionicons name="person" size={24} color="black" />}
          label="PROFİL"
          onPress={() => navigation.navigate('ProfilePage')}
        />
        <DrawerItem
          icon={<Ionicons name="people" size={24} color="black" />}
          label="KULLANICILAR"
          onPress={() => navigation.navigate('UsersPage')}
        />
        <DrawerItem
          icon={<MaterialIcons name="edit" size={24} color="black" />}
          label="GÖNDERİLERİM"
          onPress={() => navigation.navigate('PostsPage')}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="exit-outline" size={24} color="black" />
          <Text style={styles.logoutText}>ÇIKIŞ YAP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function DrawerItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
      <View style={styles.drawerItemContent}>
        {icon}
        <Text style={styles.drawerItemText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 70,  // biraz aşağı indirildi
  },
  menu: {
    flex: 1,
  },
  drawerItem: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  drawerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemText: {
    fontSize: 16,
    marginLeft: 15,
  },
  footer: {
    padding: 20,
    marginBottom: 35,  // çıkış butonunu biraz yukarı aldık
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
});



