import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from '../axios';
import {useStateValue} from '../StateProvider/StateProvider';
import {Image, View} from 'react-native';
import {SET_USER} from '../constants/reducer';
import Button from '../components/Button';
import Header from '../components/Header';
import StaggerMenu from '../components/Stagger';
import {useDisclose, Box, IconButton} from 'native-base';
import StaggerCircle from '../public/icons/dots-horizontal.png';

const Profile = ({navigation}) => {
  const style = useThemedStyles(styles);
  const [, dispatch] = useStateValue();
  const {isOpen, onToggle} = useDisclose();
  const [isLoading, setIsLoading] = useState(false);

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
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <Header />
      <Button
        title="Logout"
        styleForButtonContainer={style.btnContainer}
        styleForButton={style.btn}
        onPress={logoutHandler}
      />
      <View style={{flex: 1}}>
        <View
          style={{
            position: 'absolute',
            bottom: 6,
            right: 15,
            alignSelf: 'flex-end',
          }}>
          <Box
            zIndex="10"
            position="absolute"
            right="10%"
            bottom="120%"
            width="120">
            <StaggerMenu onToggle={onToggle} isOpen={isOpen} />
          </Box>
          {!isLoading && (
            <IconButton
              variant="solid"
              borderRadius="full"
              zIndex="10"
              size="lg"
              colorScheme="green"
              onPress={onToggle}
              icon={<Image source={StaggerCircle} />}
            />
          )}
        </View>
      </View>
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
