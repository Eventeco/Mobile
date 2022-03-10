import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Newsfeed from '../screens/Newsfeed';
import SCREENS from '../constants/screens';
import ViewEvent from '../screens/ViewEvent';

const Stack = createNativeStackNavigator();

const NewsfeedNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.NEWSFEED}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREENS.NEWSFEED} component={Newsfeed} />
      <Stack.Screen name={SCREENS.VIEW_EVENT} component={ViewEvent} />
    </Stack.Navigator>
  );
};

export default NewsfeedNavigation;
