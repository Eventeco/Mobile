import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SCREENS from '../constants/screens';
import HomeIcon from '../public/icons/home.png';
import ProfileIcon from '../public/icons/profile.png';
import AddIcon from '../public/icons/add.png';
import useTheme from '../hooks/useTheme';
import Profile from '../screens/Profile';
import TabBarIcon from '../components/TabBarIcon';
import TabBarAddButton from '../components/TabBarAddButton';
import TabBarBigIcon from '../components/TabBarBigIcon';
import AddEvent from '../screens/AddEvent';
import NewsfeedNavigation from './NewsfeedNavigation';
import ProfileNavigation from './ProfileNavigation';

const Tab = createBottomTabNavigator();

const navigationItems = [
  {
    name: SCREENS.NEWSFEED_NAVIGATION,
    component: NewsfeedNavigation,
    source: HomeIcon,
  },
  {
    name: 'AddEvent',
    component: AddEvent,
    source: AddIcon,
  },
  {
    name: SCREENS.PROFILE_NAVIGATION,
    component: ProfileNavigation,
    source: ProfileIcon,
  },
];

const getScreenOptions = item => {
  if (item.name === 'AddEvent') {
    return {
      tabBarIcon: () => <TabBarBigIcon item={item} />,
      tabBarButton: props => <TabBarAddButton {...props} />,
    };
  } else {
    return {
      tabBarIcon: ({color, focused}) => (
        <TabBarIcon color={color} focused={focused} item={item} />
      ),
    };
  }
};

const HomeNavigation = () => {
  const styles = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={SCREENS.NEWSFEED_NAVIGATION}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: '#aaa',
        tabBarActiveTintColor: styles.colors.GREEN_200,
      }}>
      {navigationItems.map((item, i) => (
        <Tab.Screen
          key={i}
          name={item.name}
          component={item.component}
          options={getScreenOptions(item)}
        />
      ))}
    </Tab.Navigator>
  );
};

export default HomeNavigation;
