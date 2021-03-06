import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Stagger, Button, useDisclose, Box, IconButton} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import SCREENS from '../constants/screens';
import StaggerCircle from '../public/icons/dots-horizontal.png';
import useThemedStyles from '../hooks/useThemedStyles';

const StaggerMenu = () => {
  const navigation = useNavigation();
  const {isOpen, onToggle} = useDisclose();
  const style = useThemedStyles(styles);

  const onPressHandler = item => {
    navigation.navigate(item);
  };

  return (
    <View style={style.container}>
      <View style={style.innerContainer}>
        <Box
          zIndex="10"
          position="absolute"
          right="10%"
          bottom="120%"
          width="120">
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
            <Button
              onPress={() => onPressHandler(SCREENS.CREATED_EVENTS)}
              colorScheme="green"
              mb="3">
              Created Events
            </Button>
            <Button
              onPress={() => onPressHandler(SCREENS.JOINED_EVENTS)}
              colorScheme="green">
              Joined Events
            </Button>
          </Stagger>
        </Box>
        <IconButton
          variant="solid"
          borderRadius="full"
          zIndex="10"
          size="lg"
          colorScheme="green"
          onPress={onToggle}
          icon={<Image source={StaggerCircle} />}
        />
      </View>
    </View>
  );
};

export default StaggerMenu;

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      position: 'absolute',
      bottom: 6,
      right: 15,
      alignSelf: 'flex-end',
    },
  });
