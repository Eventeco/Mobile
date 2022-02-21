import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';
import Logo from '../public/images/logo2.png';
import Button from './Button';
import axios from '../axios';
import {useStateValue} from '../StateProvider/StateProvider';
import {SET_USER} from '../constants/reducer';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const style = useThemedStyles(styles);

  const navigation = useNavigation();

  const [, dispatch] = useStateValue();

  const logoutHandler = () => {
    axios
      .delete('/logout')
      .then(() => {
        dispatch({
          type: SET_USER,
          data: null,
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      })
      .catch(e => console.log(e.response.data));
  };

  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image source={Logo} resizeMode="cover" style={style.image} />
      </View>
      <Button
        title="Logout"
        styleForButtonContainer={style.btnContainer}
        styleForButton={style.btn}
        onPress={logoutHandler}
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
      paddingHorizontal: 10,
      backgroundColor: theme.colors.PRIMARY_ELEMENT_BG,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageContainer: {
      width: 140,
      height: 20,
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
