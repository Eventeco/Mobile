import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import blankUser from '../public/images/blank-user.png';

const Avatar = ({path}) => {
  const containerStyles = [styles.container];
  if (path) {
    containerStyles.push(styles.rounded);
  }
  return (
    <TouchableOpacity style={containerStyles}>
      {path ? (
        <Image source={{uri: path}} style={styles.image} />
      ) : (
        <Image source={blankUser} style={styles.image} />
      )}
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
  },
  rounded: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
