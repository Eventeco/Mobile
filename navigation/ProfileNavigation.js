import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import SCREENS from '../constants/screens';
import JoinedEvents from '../screens/JoinedEvents';
import ViewEvent from '../screens/ViewEvent';
import CreatedEvents from '../screens/CreatedEvents';

const Stack = createNativeStackNavigator();

const NewsfeedNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.PROFILE}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREENS.PROFILE} component={Profile} />
      <Stack.Screen name={SCREENS.CREATED_EVENTS} component={CreatedEvents} />
      <Stack.Screen name={SCREENS.JOINED_EVENTS} component={JoinedEvents} />
      <Stack.Screen name={SCREENS.VIEW_EVENT} component={ViewEvent} />
    </Stack.Navigator>
  );
};
export default NewsfeedNavigation;
