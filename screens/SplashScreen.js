import {Image, StyleSheet} from 'react-native';
import React from 'react';
import Logo from '../public/images/logo.png';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
  return (
    <LinearGradient
      colors={['#052709', '#0C3410E8', '#134118D1', '#275B2CB8', '#094F1030']}
      style={styles.container}>
      <Image source={Logo} style={styles.image} />
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    tintColor: '#fff',
  },
});
