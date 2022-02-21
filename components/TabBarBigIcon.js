import {Image, StyleSheet} from 'react-native';
import React from 'react';
import useThemedStyles from '../hooks/useThemedStyles';

const TabBarBigIcon = ({item}) => {
  const themedStyles = useThemedStyles(styles);
  return (
    <Image
      source={item.source}
      resizeMode="contain"
      style={themedStyles.icon}
    />
  );
};

export default TabBarBigIcon;

const styles = () =>
  StyleSheet.create({
    icon: {
      width: 30,
      height: 30,
      marginTop: 5,
      opacity: 1,
      tintColor: 'green',
    },
  });
