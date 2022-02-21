import React from 'react';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';

export const ThemeContext = React.createContext();

const ThemeProvider = ({children}) => {
  const isLightTheme = true;

  const theme = {
    colors: isLightTheme ? colors.light : colors.dark,
    typography,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
