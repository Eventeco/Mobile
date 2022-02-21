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
import axios from '../axios';
import {useStateValue} from '../StateProvider/StateProvider';
import {SET_USER} from '../constants/reducer';
import SCREENS from '../constants/screens';

const Register = ({navigation}) => {
  const style = useThemedStyles(styles);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [, dispatch] = useStateValue();

  const onLoginHandler = () => {
    if (username && password && name && email) {
      const registerPayload = {
        name,
        email,
        username,
        password,
      };
      const loginPayload = {
        username,
        password,
      };
      axios.post('/register', registerPayload).then(
        res => {
          axios
            .post('/login', loginPayload)
            .then(() => {
              dispatch({
                type: SET_USER,
                data: res.data.data,
              });
              navigation.replace(SCREENS.HOME);
            })
            .catch(e => console.log(e.response.data));
        },
        err => {
          const message = err.response.data.message;
          Alert.alert(message);
        },
      );
    } else {
      const message = 'Please fill all fields';
      Alert.alert(message);
    }
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
                  placeholder="Name"
                  styleForInput={style.input}
                  value={name}
                  setValue={setName}
                />
                <Input
                  placeholder="Email Address"
                  styleForInput={style.input}
                  value={email}
                  setValue={setEmail}
                />
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
                  title="REGISTER"
                  styleForButtonContainer={style.btnContainer}
                  styleForButton={style.btn}
                  onPress={onLoginHandler}
                />
                <Text
                  style={style.noAccountText}
                  onPress={() => navigation.navigate('Login')}>
                  Already have an account?
                </Text>
              </View>
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

export default Register;

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
    },
    form: {
      marginTop: 30,
    },
    input: {
      marginBottom: 10,
    },
    btnContainer: {
      backgroundColor: theme.colors.GREEN_LIGHT,
      marginTop: 20,
    },
    btn: {
      color: '#fff',
    },
    noAccountText: {
      color: theme.colors.PRIMARY_TEXT,
      textDecorationLine: 'underline',
      textAlign: 'center',
      marginTop: 20,
    },
  });
