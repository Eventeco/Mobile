import React from 'react';
import {
  Stagger,
  Button,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import SCREENS from '../constants/screens';

const StaggerMenu = ({ onToggle, isOpen }) => {

  const navigation = useNavigation();
  const onPressHandler = (item) => {
    navigation.navigate(item);
  };
  return (
    <Stagger
      visible={isOpen}
      initial={{
        opacity: 0,
        scale: 0,
        translateY: 34,
      }}
      animate={{
        translateY: 0,
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          mass: 0.8,
          stagger: {
            offset: 30,
            reverse: true,
          },
        },
      }}
      exit={{
        translateY: 34,
        scale: 0.5,
        opacity: 0,
        transition: {
          duration: 100,
          stagger: {
            offset: 30,
            reverse: true,
          },
        },
      }}>
      <Button onPress={() => onPressHandler(SCREENS.PROFILE)} colorScheme="green" mb="3">Profile</Button>
      <Button onPress={() => onPressHandler(SCREENS.CREATED_EVENTS)} colorScheme="green" mb="3">Created Events</Button>
      <Button onPress={() => onPressHandler(SCREENS.JOINED_EVENTS)} colorScheme="green">Joined Events</Button>
    </Stagger>
  );
};

export default StaggerMenu;
