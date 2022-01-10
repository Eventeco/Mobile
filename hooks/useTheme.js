import {useContext} from 'react';
import {ThemeContext} from '../hoc/ThemeProvider';

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
