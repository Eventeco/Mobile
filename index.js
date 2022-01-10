/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import reducer, {initialState} from './StateProvider/reducer';
import {StateProvider} from './StateProvider/StateProvider';
import ThemeProvider from './hoc/ThemeProvider';

const WrappedApp = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StateProvider>
  );
};

AppRegistry.registerComponent(appName, () => WrappedApp);
