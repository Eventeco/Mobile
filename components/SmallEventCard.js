import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import useThemedStyles from '../hooks/useThemedStyles';
import {BASE_URL} from '../constants';

const SmallEventCard = ({item, onPressHandler = () => {}}) => {
  const themedStyles = useThemedStyles(styles);
  return (
    <TouchableOpacity style={themedStyles.container} onPress={onPressHandler}>
      <Image
        source={{uri: `${BASE_URL}/eventPictures/key/${item.picturepath}`}}
        style={themedStyles.image}
      />
      <Text style={themedStyles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default SmallEventCard;

const styles = theme =>
  StyleSheet.create({
    container: {
      marginVertical: 10,
      backgroundColor: theme.colors.BLUE_100,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
    image: {
      height: 100,
    },
    text: {
      fontSize: theme.typography.size.S,
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 15,
      color: 'black',
      fontFamily: 'Lora-Bold',
    },
  });
