import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import Input from '../components/Input';
import useThemedStyles from '../hooks/useThemedStyles';
import BGImage from '../public/images/bg.png';
import Logo from '../public/images/logo.png';
import Button from '../components/Button';
import {useStateValue} from '../StateProvider/StateProvider';
import {loginHandler} from '../helper';

const Login = ({navigation}) => {
  const style = useThemedStyles(styles);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [, dispatch] = useStateValue();

  const onLoginHandler = () => {
    if (username && password) {
      const payload = {
        username,
        password,
      };
      loginHandler(payload, dispatch);
    } else {
      const message = 'Please fill all fields';
      Alert.alert(message);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View>
      <ImageBackground
        source={BGImage}
        style={style.bgImageContainer}
        blurRadius={1}
        imageStyle={style.bgImage}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={style.innerFrame}>
            <SafeAreaView style={style.formContainer}>
              <Image source={Logo} />
              <View style={style.form}>
                <Input
                  placeholder="Username"
                  styleForInput={style.input}
                  value={username}
                  setValue={setUsername}
                />
                <Input
                  placeholder="Password"
                  styleForInput={style.input}
                  value={password}
                  setValue={setPassword}
                  secureTextEntry={true}
                />
                <Button
                  title="LOGIN"
                  styleForButtonContainer={style.btnContainer}
                  styleForButton={style.btn}
                  onPress={onLoginHandler}
                />
                <Text style={style.noAccountText} onPress={navigateToRegister}>
                  Don't have an Account?
                </Text>
              </View>
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = theme =>
  StyleSheet.create({
    bgImageContainer: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    bgImage: {
      opacity: 0.35,
    },
    innerFrame: {
      backgroundColor: 'rgba(0, 46, 2, 0.75)',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    formContainer: {
      backgroundColor: theme.colors.PRIMARY_APP_BG,
      borderRadius: 10,
      paddingVertical: 24,
      paddingHorizontal: 47,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 10,
      maxHeight: '95%',
    },
    form: {
      marginTop: 80,
    },
    input: {
      marginBottom: 54,
      fontFamily: 'Molengo-Regular',
      fontSize: theme.typography.size.M,
    },
    btnContainer: {
      backgroundColor: theme.colors.GREEN_LIGHT,
    },
    btn: {
      color: '#fff',
      fontFamily: 'Molengo-Regular',
      fontSize: theme.typography.size.S,
    },
    noAccountText: {
      color: theme.colors.PRIMARY_TEXT,
      textDecorationLine: 'underline',
      fontFamily: 'Molengo-Regular',
      textAlign: 'center',
      marginTop: 20,
      fontSize: theme.typography.size.S,
    },
  });
