import React from 'react';
import {StyleSheet} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from '../axios';
import {useStateValue} from '../StateProvider/StateProvider';
import {SET_USER} from '../constants/reducer';
import Button from '../components/Button';
import Header from '../components/Header';
import StaggerMenu from '../components/Stagger';

const Profile = ({navigation}) => {
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
    <SafeAreaView style={style.container}>
      <Header />
      <Button
        title="Logout"
        styleForButtonContainer={style.btnContainer}
        styleForButton={style.btn}
        onPress={logoutHandler}
      />
      <StaggerMenu />
    </SafeAreaView>
  );
};

export default Profile;

const styles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
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
