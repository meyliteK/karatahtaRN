// import React, { createContext, useState } from 'react';
// import lightMode from './light_mode';
// import darkMode from './dark_mode';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleTheme = () => {
//     setIsDarkMode((prev) => !prev);
//   };

//   const theme = isDarkMode ? darkMode : lightMode;

//   return (
//     <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
import React, { createContext, useState } from 'react';
import lightMode from './light_mode';
import darkMode from './dark_mode';

export const ThemeContext = createContext({
  theme: lightMode,
  isDarkMode: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = isDarkMode ? darkMode : lightMode;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

