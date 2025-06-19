// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import React, { useState } from 'react';
// import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { auth, db } from '../firebase';

// export default function RegisterPage({ onTap }) {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const registerUser = async () => {
//     setIsLoading(true);

//     if (password !== confirmPassword) {
//       Alert.alert('Hata', 'Şifreler uyuşmuyor!');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);

//       await setDoc(doc(db, 'Users', userCredential.user.email), {
//         username: username !== '' ? username : email.split('@')[0],
//         bio: 'Empty bio..',
//       });

//     } catch (e) {
//       Alert.alert('Hata', e.message);
//     }

//     setIsLoading(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>KARA TAHTA</Text>

//       <TextInput
//         placeholder="Kullanıcı Adı"
//         value={username}
//         onChangeText={setUsername}
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//         autoCapitalize="none"
//       />

//       <TextInput
//         placeholder="Şifre"
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//         secureTextEntry
//       />

//       <TextInput
//         placeholder="Şifreyi Onayla"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         style={styles.input}
//         secureTextEntry
//       />

//       <TouchableOpacity style={styles.button} onPress={registerUser}>
//         {isLoading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>Kayıt Ol</Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity onPress={onTap}>
//         <Text style={styles.registerText}>Zaten Hesabın Var mı? Giriş Yap</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, flex: 1, justifyContent: 'center' },
//   title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
//   input: { borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 8, marginBottom: 15 },
//   button: { backgroundColor: '#F36595', padding: 15, borderRadius: 8, alignItems: 'center' },
//   buttonText: { color: '#fff', fontWeight: 'bold' },
//   registerText: { marginTop: 20, color: '#007bff', textAlign: 'center' },
// });
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import MyTextField from '../components/my_textfield';
import MyButton from '../components/my_button';
import { ThemeContext } from '../theme/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { serverTimestamp } from "firebase/firestore";


export default function RegisterPage({ navigation }) {
  const { theme } = useContext(ThemeContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Şifreler uyuşmuyor!");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "Users", userCredential.user.email), {
        username: username,
        bio: "",
        isOnline: true, 
        lastOnline: serverTimestamp(), 
      });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={{ alignItems: 'center', marginBottom: 25 }}>
              <MaterialIcons name="my-library-books" size={80} color={theme.tertiary} />
      </View>
      <Text style={styles.title}>KARA TAHTA</Text>

      <MyTextField hintText="Kullanıcı Adı" obscureText={false} value={username} onChangeText={setUsername} prefixIcon="person" />
      <MyTextField hintText="Email" obscureText={false} value={email} onChangeText={setEmail} prefixIcon="mail" />
      <MyTextField hintText="Şifre" obscureText={true} value={password} onChangeText={setPassword} prefixIcon="lock-closed" />
      <MyTextField hintText="Şifreyi Onayla" obscureText={true} value={confirmPassword} onChangeText={setConfirmPassword} prefixIcon="checkmark-circle-outline" />

      <MyButton text="Kayıt Ol" onPress={handleRegister} />

      {loading && <ActivityIndicator size="large" color={theme.inversePrimary} />}
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <View style={styles.loginContainer}>
        <Text>Zaten bir hesabınız var mı? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 25 },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 25, alignSelf: 'center' },
  error: { color: 'red', marginTop: 10 },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  loginText: { fontWeight: 'bold' },
});

