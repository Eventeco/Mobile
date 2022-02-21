import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import useThemedStyles from '../hooks/useThemedStyles';

const TabBarIcon = ({color, focused, item}) => {
  const themedStyles = useThemedStyles(styles);
  const iconContainerStyle = StyleSheet.compose(
    {
      borderTopColor: color,
      borderTopWidth: focused ? 2 : 0,
    },
    themedStyles.iconContainer,
  );
  const iconStyle = StyleSheet.compose({tintColor: color}, themedStyles.icon);
  return (
    <View style={iconContainerStyle}>
      <Image source={item.source} resizeMode="contain" style={iconStyle} />
    </View>
  );
};

export default TabBarIcon;

const styles = () =>
  StyleSheet.create({
    iconContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: 30,
      height: 30,
      marginTop: 5,
    },
  });
