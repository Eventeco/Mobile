import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useThemedStyles from '../hooks/useThemedStyles';

const SmallEventCard = ({item}) => {
  const themedStyles = useThemedStyles(styles);
  return (
    <View style={themedStyles.container}>
      <Image source={{uri: item.picturepath}} style={themedStyles.image} />
      <Text style={themedStyles.text}>{item.name}</Text>
    </View>
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
      fontSize: theme.typography.size.M,
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 15,
      fontWeight: '600',
      color: 'black',
    },
  });