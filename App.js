import React, {useEffect} from 'react';
import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './screens/Register';
import Newsfeed from './screens/Newsfeed';
import axios from './axios';
import {useStateValue} from './StateProvider/StateProvider';
import {SET_USER} from './constants/reducer';
import Header from './components/Header';

const Stack = createNativeStackNavigator();

const App = () => {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    axios
      .get('/login-status')
      .then(res => {
        dispatch({
          type: SET_USER,
          data: res.data.data,
        });
      })
      .catch(() => console.log('logged out'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          header: () => <Header />,
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Newsfeed" component={Newsfeed} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
