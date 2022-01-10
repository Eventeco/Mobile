import React from 'react';
import ThemeProvider from './hoc/ThemeProvider';
import Login from './screens/Login';
import reducer, {initialState} from './StateProvider/reducer';
import {StateProvider} from './StateProvider/StateProvider';

const App = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ThemeProvider>
        <Login />
      </ThemeProvider>
    </StateProvider>
  );
};

export default App;
