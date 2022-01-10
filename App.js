import axios from './axios';
import React, {useEffect} from 'react';
import ThemeProvider from './hoc/ThemeProvider';
import Login from './screens/Login';
import reducer, {initialState} from './StateProvider/reducer';
import {StateProvider} from './StateProvider/StateProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './screens/Register';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    axios.delete('/logout').catch(err => console.log(err.message));
  }, []);
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </StateProvider>
  );
};

export default App;
