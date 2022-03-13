import React from 'react';
import {Text, StyleSheet} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from '../axios';
import {useStateValue} from '../StateProvider/StateProvider';
import {SET_USER} from '../constants/reducer';
import Button from '../components/Button';

const Profile = () => {

  const style = useThemedStyles(styles);
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
    <SafeAreaView>
      <Text>Profile</Text>
      <Button
        title="Logout"
        styleForButtonContainer={style.btnContainer}
        styleForButton={style.btn}
        onPress={logoutHandler}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 60,
      paddingHorizontal: 10,
      backgroundColor: theme.colors.GREEN_200,
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
    backImageContainer: {
      width: 20,
      height: 20,
    },
    backImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  });