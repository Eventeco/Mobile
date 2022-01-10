import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import axios from '../axios';
import {SET_USER} from '../constants/reducer';
import {useStateValue} from '../StateProvider/StateProvider';

const Newsfeed = ({navigation}) => {
  const [{user}, dispatch] = useStateValue();
  const logoutHandler = () => {
    axios.delete('/logout').then(res => {
      dispatch({
        type: SET_USER,
        data: null,
      });
      navigation.navigate('Login');
    });
  };

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <SafeAreaView>
      <Header btnClickHandler={logoutHandler} />
    </SafeAreaView>
  );
};

export default Newsfeed;

const styles = StyleSheet.create({});
