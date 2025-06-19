import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
  
        // Firestore üzerinde online durumunu güncelle
        const userRef = doc(db, "Users", firebaseUser.email);
        await updateDoc(userRef, {
          isOnline: true,
          lastOnline: serverTimestamp(),
        });
  
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
  
    return unsubscribe;
  }, []);
  

  const handleUserFirestoreSync = async (firebaseUser) => {
    const userRef = doc(db, 'Users', firebaseUser.email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // Kullanıcı zaten varsa, sadece online güncelle
      await updateDoc(userRef, {
        isOnline: true,
        lastOnline: serverTimestamp(),
      });
    } else {
      // Kullanıcı daha önce kayıt olmamışsa ilk defa oluştur
      await setDoc(userRef, {
        username: firebaseUser.email.split('@')[0],
        bio: '',
        isOnline: true,
        lastOnline: serverTimestamp(),
      });
    }
  };

  const logout = async () => {
    if (user) {
      const userRef = doc(db, 'Users', user.email);
      await updateDoc(userRef, {
        isOnline: false,
        lastOnline: serverTimestamp(),
      });
    }
    await signOut(auth);  // 🔥 küçük ekleme sadece
  };
  

  return (
    <AuthContext.Provider value={{ user, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

