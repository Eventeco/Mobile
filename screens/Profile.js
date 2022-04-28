import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import axios from '../axios';
import {useStateValue} from '../StateProvider/StateProvider';
import {SET_USER} from '../constants/reducer';
import {launchImageLibrary} from 'react-native-image-picker';
import Button from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import StaggerMenu from '../components/Stagger';
import {HStack, VStack, Text, Button as NativeButton} from 'native-base';
import EmptyImage from '../public/images/empty-profile-image.png';
import Pencil from '../public/icons/pencil-solid.png';
import {BASE_URL} from '../constants';
import Alert from '../components/Alert';

const Profile = ({navigation}) => {
  const style = useThemedStyles(styles);
  const [{user}, dispatch] = useStateValue();
  const [name, setName] = useState(user.firstname + ' ' + user.lastname);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [dob, setDOB] = useState(
    user.dateofbirth ? new Date(user.dateofbirth) : null,
  );
  const [edit, setEdit] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertText, setAlertText] = useState('');

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate;
    setDOB(currentDate);
  };

  const handleChooseProfilePhoto = () => {
    if (edit) {
      launchImageLibrary(
        {includeBase64: true, mediaType: 'photo', quality: 1},
        response => {
          if (response && response.assets) {
            if (response?.assets[0]?.fileSize < 5200000) {
              setProfileImage(response?.assets[0]);
            } else {
              setIsAlertOpen(true);
              setAlertTitle('Image File Size Exceeded');
              setAlertText(
                'You cannot upload images with file size greater than 5MBs',
              );
            }
          }
        },
      );
    }
  };

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const alertCloseHandler = () => {
    setIsAlertOpen(false);
  };

  useEffect(() => {
    try {
      axios.get(`/user/${user.id}`).then(response => {
        setName(
          response.data.data.firstname + ' ' + response.data.data.lastname,
        );
        setEmail(response.data.data.email);
        setDOB(
          response.data.data.dateofbirth
            ? new Date(response.data.data.dateofbirth)
            : null,
        );
      });
    } catch (e) {
      console.log(e);
    }
  }, [user.id]);

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

  const updateProfile = () => {
    try {
      const changes = {
        firstname: name.split(' ')[0],
        lastname: name.replace(name.split(' ')[0] + ' ', ''),
        dateofbirth: dob,
        email: email,
        username: username,
      };

      if (profileImage && profileImage.base64) {
        changes.base64 = profileImage.base64;
      }
      axios.patch('/user', changes).then(() => {
        setEdit(!edit);
      });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header />
      <VStack style={style.pageStack}>
        <HStack style={style.imageStack} justifyContent="space-between">
          <View>
            <TouchableOpacity onPress={() => handleChooseProfilePhoto()}>
              {profileImage ? (
                <Image
                  source={{uri: profileImage.uri}}
                  style={style.profileImage}
                />
              ) : user.profilepicpath ? (
                <Image
                  source={{
                    uri: `${BASE_URL}/s3/getImage/${user.profilepicpath}`,
                  }}
                  style={style.profileImage}
                />
              ) : (
                <Image source={EmptyImage} style={style.profileImage} />
              )}
            </TouchableOpacity>
          </View>
          <View>
            {!edit ? (
              <NativeButton
                onPress={() => setEdit(!edit)}
                style={style.editButton}
                variant="outline"
                colorScheme="green"
                height="10">
                <HStack>
                  <Image source={Pencil} style={style.editPencil} />
                  <Text color="green.500" fontWeight="medium" ml="2">
                    Edit Profile
                  </Text>
                </HStack>
              </NativeButton>
            ) : (
              <NativeButton
                onPress={() => updateProfile()}
                mt="10"
                colorScheme="green"
                height="10">
                <HStack>
                  <Text color="white" fontWeight="medium">
                    Save Changes
                  </Text>
                </HStack>
              </NativeButton>
            )}
          </View>
        </HStack>
        <HStack style={style.inputStack}>
          <VStack>
            <Text color="green.600" fontWeight="medium">
              Name:
            </Text>
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              placeholder={''}
              width={250}
              height="10"
              isDisabled={!edit}
            />
          </VStack>
        </HStack>
        <HStack mt="2">
          <VStack>
            <Text color="green.600" fontWeight="medium">
              Email:
            </Text>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder={''}
              width={250}
              height="10"
              isDisabled={!edit}
            />
          </VStack>
        </HStack>
        <HStack mt="2">
          <VStack>
            <Text color="green.600" fontWeight="medium">
              Username
            </Text>
            <TextInput
              value={username}
              placeholder={''}
              width={250}
              height="10"
              isDisabled={true}
              onChangeText={text => setUsername(text)}
            />
          </VStack>
        </HStack>
        <HStack mt="2">
          <VStack>
            <Text color="green.600" fontWeight="medium">
              Date of Birth
            </Text>
            {!edit ? (
              <TextInput
                height="10"
                value={dob ? dob.toDateString() : dob}
                placeholder={'Select Date of Birth'}
                width={250}
                isDisabled={true}
              />
            ) : (
              <TouchableOpacity onPress={showDatepicker}>
                <TextInput
                  height="10"
                  value={dob ? dob.toDateString() : dob}
                  placeholder={'Select Date of Birth'}
                  width={250}
                  isDisabled={true}
                />
              </TouchableOpacity>
            )}
          </VStack>
        </HStack>
      </VStack>
      <Button
        title="Logout"
        styleForButtonContainer={style.btnContainer}
        styleForButton={style.btn}
        onPress={logoutHandler}
      />
      <Alert
        alertTitle={alertTitle}
        alertText={alertText}
        onClose={alertCloseHandler}
        isOpen={isAlertOpen}
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
    profileImage: {
      width: 100,
      borderRadius: 50,
      height: 100,
    },
    pageStack: {
      margin: 20,
    },
    imageStack: {},
    editButton: {
      marginTop: 40,
      borderWidth: 2,
    },
    editPencil: {
      width: 20,
      height: 20,
    },
    inputStack: {
      marginTop: 20,
    },
  });
