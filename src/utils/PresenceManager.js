import { AppState } from 'react-native';
import { db } from '../firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

let appStateListener = null;

export function startPresenceListener(userEmail) {
  if (!userEmail) return;

  const userRef = doc(db, 'Users', userEmail);

  const updateOnlineStatus = async (isOnline) => {
    await updateDoc(userRef, {
      isOnline: isOnline,
      lastOnline: serverTimestamp()
    });
  };

  // İlk girişte online yap
  updateOnlineStatus(true);

  // AppState değişimini dinle
  appStateListener = AppState.addEventListener('change', (nextState) => {
    if (nextState === 'background' || nextState === 'inactive') {
      updateOnlineStatus(false);
    } else if (nextState === 'active') {
      updateOnlineStatus(true);
    }
  });
}

export function stopPresenceListener() {
  if (appStateListener) {
    appStateListener.remove();
    appStateListener = null;
  }
}
