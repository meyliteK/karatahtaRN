// import React from 'react';
// import { ThemeProvider } from './src/theme/ThemeContext';
// import AppNavigator from './src/navigation/AppNavigator';
// import './src/firebase';

// export default function App() {
//   return (
//     <ThemeProvider>
//       <AppNavigator />
//     </ThemeProvider>
//   );
// }
// import React from 'react';
// import AppNavigator from './src/navigation/AppNavigator';
// import './src/firebase';

// export default function App() {
//   return <AppNavigator />;
// }

// import React from 'react';
// import AppNavigator from './src/navigation/AppNavigator';
// import { ThemeProvider } from './src/theme/ThemeContext';
// import { AuthProvider } from './src/context/AuthContext';
// import './src/firebase';

// export default function App() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <AppNavigator />
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }


// import React from 'react';
// import AppNavigator from './src/navigation/AppNavigator';
// import { ThemeProvider } from './src/theme/ThemeContext';
// import { AuthProvider } from './src/context/AuthContext';
// import './src/firebase';
// import { NavigationContainer } from '@react-navigation/native';

// export default function App() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <NavigationContainer>
//           <AppNavigator />
//         </NavigationContainer>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }
// function AppContent() {
//   const { authLoading } = useContext(AuthContext);

//   if (authLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#f36595" />
//       </View>
//     );
//   }

//   return <AppNavigator />;
// } 


import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/theme/ThemeContext';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import './src/firebase';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { authLoading } = useContext(AuthContext);

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#f36595" />
      </View>
    );
  }

  return <AppNavigator />;
}
