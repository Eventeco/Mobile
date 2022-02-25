import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import useThemedStyles from '../hooks/useThemedStyles';

const TabBarAddButton = ({children, onPress}) => {
  const themedStyles = useThemedStyles(styles);

  return (
    <TouchableOpacity onPress={onPress} style={themedStyles.container}>
      <View style={themedStyles.innerContainer}>{children}</View>
    </TouchableOpacity>
  );
};

export default TabBarAddButton;

const styles = theme =>
  StyleSheet.create({
    container: {
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      borderRadius: 50,
      width: 70,
      height: 70,
      backgroundColor: theme.colors.GREEN_200,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
  });
