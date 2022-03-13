import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import reducer, {initialState} from './StateProvider/reducer';
import {StateProvider} from './StateProvider/StateProvider';
import {NativeBaseProvider} from 'native-base';
import ThemeProvider from './hoc/ThemeProvider';

LogBox.ignoreLogs(['NativeBase:']);

const WrappedApp = () => {
  return (
    <NativeBaseProvider>
      <StateProvider initialState={initialState} reducer={reducer}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StateProvider>
    </NativeBaseProvider>
  );
};

AppRegistry.registerComponent(appName, () => WrappedApp);
