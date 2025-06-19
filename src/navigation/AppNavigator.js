//  import React, { useEffect, useState } from 'react';
//  import { NavigationContainer } from '@react-navigation/native';
//  import { createNativeStackNavigator } from '@react-navigation/native-stack';
//  import { createDrawerNavigator } from '@react-navigation/drawer';
//  import LoginPage from '../pages/login_page';
//  import RegisterPage from '../pages/register_page';
//  import HomePage from '../pages/home_page';
//  import ProfilePage from '../pages/profile_page';
//  import UsersPage from '../pages/users_page';
//  import PostsPage from '../pages/posts_page';
//  import { auth } from '../firebase';
//  import { onAuthStateChanged } from 'firebase/auth';

//  const Stack = createNativeStackNavigator();
//  const Drawer = createDrawerNavigator();

//  function DrawerRoutes() {
//    return (
//      <Drawer.Navigator
//        initialRouteName="Home Page"
//        drawerContent={(props) => <MyDrawer {...props} />}
//      >
//        <Drawer.Screen name="Home Page" component={HomePage} />
//        <Drawer.Screen name="Profile Page" component={ProfilePage} />
//        <Drawer.Screen name="Users Page" component={UsersPage} />
//        <Drawer.Screen name="Posts Page" component={PostsPage} />
//      </Drawer.Navigator>
//    );
//  }


//  export default function AppNavigator() {
//    const [user, setUser] = useState(null);
//    const [loading, setLoading] = useState(true);

//    useEffect(() => {
//      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//        setUser(currentUser);
//        setLoading(false);
//      });

//      return () => unsubscribe();
//    }, []);

//    if (loading) return null;

//    return (
//      <NavigationContainer>
//        <Stack.Navigator screenOptions={{ headerShown: false }}>
//          {!user ? (
//            <>
//              <Stack.Screen name="LoginPage" component={LoginPage} />
//              <Stack.Screen name="RegisterPage" component={RegisterPage} />
//            </>
//          ) : (
//            <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} />
//          )}
//        </Stack.Navigator>
//      </NavigationContainer>
//    );
//  }

// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase';
// import { ThemeProvider } from '../theme/ThemeContext';

// // sayfaları import ediyoruz
// import LoginPage from '../pages/login_page';
// import RegisterPage from '../pages/register_page';
// import HomePage from '../pages/home_page';
// import ProfilePage from '../pages/profile_page';
// import UsersPage from '../pages/users_page';
// import PostsPage from '../pages/posts_page';

// // componentleri import ediyoruz
// import MyDrawer from '../components/my_drawer';

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// function DrawerRoutes() {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Home Page"
//       drawerContent={(props) => <MyDrawer {...props} />}
//     >
//       <Drawer.Screen name="Home Page" component={HomePage} />
//       <Drawer.Screen name="Profile Page" component={ProfilePage} />
//       <Drawer.Screen name="Users Page" component={UsersPage} />
//       <Drawer.Screen name="Posts Page" component={PostsPage} />
//     </Drawer.Navigator>
//   );
// }

// export default function AppNavigator() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) return null;

//   return (
//     <NavigationContainer>
//       <ThemeProvider>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           {!user ? (
//             <>
//               <Stack.Screen name="LoginPage" component={LoginPage} />
//               <Stack.Screen name="RegisterPage" component={RegisterPage} />
//             </>
//           ) : (
//             <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} />
//           )}
//         </Stack.Navigator>
//       </ThemeProvider>
//     </NavigationContainer>
//   );
// }

// import React, { useContext } from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomePage from '../pages/home_page';
// import ProfilePage from '../pages/profile_page';
// import PostsPage from '../pages/posts_page';
// import UsersPage from '../pages/users_page';
// import MyDrawer from '../components/my_drawer';
// import { ThemeContext } from '../theme/ThemeContext';

// const Drawer = createDrawerNavigator();

// export default function AppNavigator() {
//   const { theme } = useContext(ThemeContext);

//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <MyDrawer {...props} />}
//       screenOptions={{
//         headerStyle: { backgroundColor: theme.tertiary },
//         headerTintColor: '#000',
//       }}
//     >
//       <Drawer.Screen name="HomePage" component={HomePage} />
//       <Drawer.Screen name="ProfilePage" component={ProfilePage} />
//       <Drawer.Screen name="PostsPage" component={PostsPage} />
//       <Drawer.Screen name="UsersPage" component={UsersPage} />
//     </Drawer.Navigator>
//   );
// }

import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginPage from '../pages/login_page';
import RegisterPage from '../pages/register_page';
import HomePage from '../pages/home_page';
import ProfilePage from '../pages/profile_page';
import PostsPage from '../pages/posts_page';
import UsersPage from '../pages/users_page';
import MyDrawer from '../components/my_drawer';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme, isDarkMode } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      {user ? (
        <Drawer.Navigator
          drawerContent={(props) => <MyDrawer {...props} />}
          screenOptions={{
            headerStyle: { backgroundColor: theme.tertiary },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
                <Ionicons name={isDarkMode ? 'moon' : 'sunny'} size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        >
          <Drawer.Screen name="HomePage" component={HomePage} options={{ title: 'Ana Sayfa' }} />
          <Drawer.Screen name="ProfilePage" component={ProfilePage} options={{ title: 'Profil' }} />
          <Drawer.Screen name="PostsPage" component={PostsPage} options={{ title: 'Gönderilerim' }} />
          <Drawer.Screen name="UsersPage" component={UsersPage} options={{ title: 'Kullanıcılar' }} />
        </Drawer.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

function AuthNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Login" component={LoginPage} />
      <Drawer.Screen name="Register" component={RegisterPage} />
    </Drawer.Navigator>
  );
}
