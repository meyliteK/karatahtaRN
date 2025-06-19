// import { signInWithEmailAndPassword } from 'firebase/auth';
// import React, { useState } from 'react';
// import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { auth } from '../firebase';

// export default function LoginPage({ onTap }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   const login = async () => {
//     setIsLoading(true);
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (e) {
//       Alert.alert('Hata', e.message);
//     }
//     setIsLoading(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>KARA TAHTA</Text>

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
//         secureTextEntry={!isPasswordVisible}
//       />

//       <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
//         <Text style={styles.passwordToggle}>
//           {isPasswordVisible ? 'Şifreyi Gizle' : 'Şifreyi Göster'}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={login}>
//         {isLoading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>Giriş Yap</Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity onPress={onTap}>
//         <Text style={styles.registerText}>Hemen Kayıt Olun</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, flex: 1, justifyContent: 'center' },
//   title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
//   input: { borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 8, marginBottom: 15 },
//   passwordToggle: { textAlign: 'right', marginBottom: 15, color: '#555' },
//   button: { backgroundColor: '#F36595', padding: 15, borderRadius: 8, alignItems: 'center' },
//   buttonText: { color: '#fff', fontWeight: 'bold' },
//   registerText: { marginTop: 20, color: '#007bff', textAlign: 'center' },
// });
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import MyTextField from '../components/my_textfield';
import MyButton from '../components/my_button';
import { ThemeContext } from '../theme/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';


export default function LoginPage({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
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

      <MyTextField
        hintText="Email"
        obscureText={false}
        value={email}
        onChangeText={setEmail}
        prefixIcon="mail"
      />

      <MyTextField
        hintText="Şifre"
        obscureText={!passwordVisible}
        value={password}
        onChangeText={setPassword}
        prefixIcon="lock-closed"
        suffixIcon={passwordVisible ? "eye" : "eye-off"}
        onSuffixPress={() => setPasswordVisible(!passwordVisible)}
      />

      <MyButton text="Giriş Yap" onPress={handleLogin} />

      {loading && <ActivityIndicator size="large" color={theme.inversePrimary} />}
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <View style={styles.registerContainer}>
        <Text>Hesabınız yok mu? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Hemen Kayıt Olun</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 25 },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 25, alignSelf: 'center' },
  error: { color: 'red', marginTop: 10 },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  registerText: { fontWeight: 'bold' },
});
