import React, {useEffect, useState} from 'react';
import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import Register from './screens/Register';
import HomeNavigation from './navigation/HomeNavigation';
import axios from './axios';
import {useStateValue} from './StateProvider/StateProvider';
import {SET_USER} from './constants/reducer';
import Header from './components/Header';
import SCREENS from './constants/screens';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [{user}, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getLoginStatus = async () => {
      try {
        const res = await axios.get('/login-status');
        dispatch({
          type: SET_USER,
          data: res.data.data,
        });
      } catch (e) {
        console.log('logged out');
      } finally {
        setLoading(false);
      }
    };

    getLoginStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

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
          <Stack.Screen name={SCREENS.HOME} component={HomeNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
