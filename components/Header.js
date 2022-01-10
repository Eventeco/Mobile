import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';
import Logo from '../public/images/logo.png';
import Button from './Button';

const Header = ({btnClickHandler}) => {
  const style = useThemedStyles(styles);

  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image source={Logo} resizeMode="cover" style={style.image} />
      </View>
      <Button
        title="Logout"
        styleForButtonContainer={style.btnContainer}
        styleForButton={style.btn}
        onPress={btnClickHandler}
      />
    </View>
  );
};

export default Header;

const styles = theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 60,
      padding: 10,
      backgroundColor: theme.colors.PRIMARY_ELEMENT_BG,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageContainer: {
      width: 126,
      height: '100%',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    btnContainer: {
      backgroundColor: 'red',
      width: 150,
      minHeight: 'auto',
      paddingVertical: 7,
    },
    btn: {
      color: 'white',
      fontWeight: '700',
    },
  });
