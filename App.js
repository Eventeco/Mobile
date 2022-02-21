import React, {useEffect} from 'react';
import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './screens/Register';
import Home from './navigation/Home';
import axios from './axios';
import {useStateValue} from './StateProvider/StateProvider';
import {SET_USER} from './constants/reducer';
import Header from './components/Header';
import SCREENS from './constants/screens';

const Stack = createNativeStackNavigator();

const App = () => {
  const [{user}, dispatch] = useStateValue();

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
        initialRouteName={SCREENS.LOGIN}
        screenOptions={{
          header: () => <Header />,
        }}>
        {!user ? (
          <>
            <Stack.Screen
              name={SCREENS.LOGIN}
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREENS.REGISTER}
              component={Register}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={SCREENS.HOME} component={Home} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
