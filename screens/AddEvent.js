import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';
import AddImageBtn from '../public/icons/add-image-btn.png';
import React, {useState} from 'react';
import UploadPicturesBtn from '../public/icons/upload-btn.png';
import LocationIcon from '../public/icons/location.png';
import TextInput from '../components/TextInput';
import {launchImageLibrary} from 'react-native-image-picker';
import {TextArea, Badge, Text} from 'native-base';
import TrashCan from '../public/icons/trash-can-solid.png';
import Alert from '../components/Alert';
import axios from '../axios';
import Button from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getDayAndDate, getTime} from '../helper';
import {differenceInDays, differenceInMinutes, isBefore} from 'date-fns';
import GooglePlacesInput from '../components/GooglePlacesInput';
import SCREENS from '../constants/screens';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStateValue} from '../StateProvider/StateProvider';

const AddEvent = ({navigation}) => {
  const style = useThemedStyles(styles);
  const [{issues}] = useStateValue();

  const [selectedThemes, setSelectedThemes] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [eventPhotos, setEventPhotos] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertText, setAlertText] = useState('');
  const [isRuleAlertOpen, setIsRuleAlertOpen] = useState(false);
  const [rule, setRule] = useState('');
  const [minParticipants, setMinParticipants] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [startTimePickerShow, setStartTimePickerShow] = useState(false);
  const [endTimePickerShow, setEndTimePickerShow] = useState(false);
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);

  const onDateTimePickerChange = (_, selectedDate, type) => {
    if (type === 'start') {
      setStartTimePickerShow(false);
      setStartTime(selectedDate);
      if (isBefore(endTime, selectedDate)) {
        setEndTime(selectedDate);
      }
    } else if (type === 'end') {
      setEndTimePickerShow(false);
      setEndTime(selectedDate);
      if (isBefore(selectedDate, startTime)) {
        setStartTime(selectedDate);
      }
    }
  };

  const showMode = (currentMode, type) => {
    if (type === 'start') {
      setStartTimePickerShow(true);
    } else if (type === 'end') {
      setEndTimePickerShow(true);
    }
    setMode(currentMode);
  };

  const showDatepicker = type => {
    showMode('date', type);
  };

  const showTimepicker = type => {
    showMode('time', type);
  };

  const selectThemeAction = id => {
    setSelectedThemes(prevState => {
      return [...prevState, id];
    });
  };

  const handleChooseCoverPhoto = () => {
    launchImageLibrary(
      {includeBase64: true, mediaType: 'photo', quality: 0.5},
      response => {
        if (response && response.assets) {
          if (response?.assets[0]?.fileSize < 5200000) {
            setCoverPhoto(response?.assets[0]);
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
  };

  const uploadPictures = () => {
    launchImageLibrary({includeBase64: true, mediaType: 'photo'}, response => {
      if (response && response.assets) {
        if (response?.assets[0]?.fileSize < 5200000) {
          setEventPhotos(prevState => {
            return [...prevState, response?.assets[0]];
          });
        } else {
          setIsAlertOpen(true);
          setAlertTitle('Image File Size Exceeded');
          setAlertText(
            'You cannot upload images with file size greater than 5MBs',
          );
        }
      }
    });
  };

  const deleteEventPhoto = index => {
    setEventPhotos(prevState => {
      return prevState.filter((_, i) => i !== index);
    });
  };

  const unselectThemeAction = id => {
    setSelectedThemes(prevState => {
      return prevState.filter(themeId => themeId !== id);
    });
  };

  const alertCloseHandler = () => {
    setIsAlertOpen(false);
  };

  const addRuleHandler = item => {
    if (rule) {
      setRules(prevState => {
        return [...prevState, item];
      });
      setRule('');
    }
  };

  const deleteRuleHandler = index => {
    setRules(prevState => {
      return prevState.filter((_, i) => i !== index);
    });
  };

  const ruleAlertCloseHandler = () => {
    setIsRuleAlertOpen(false);
  };

  const participantOnChangeHandler = (type, value) => {
    const parsedValue = value.replace(/[^0-9]/g, '');
    if (type === 'min') {
      setMinParticipants(parsedValue);
    } else {
      setMaxParticipants(parsedValue);
    }
  };

  //todo
  const handleSubmit = async () => {
    if (!name) {
      setIsAlertOpen(true);
      setAlertTitle('Event Name Required');
      setAlertText('Please enter a name for the event');
      return;
    }
    if (!description) {
      setIsAlertOpen(true);
      setAlertTitle('Event Description Required');
      setAlertText('Please enter a description for the event');
      return;
    }
    if (selectedThemes.length === 0) {
      setIsAlertOpen(true);
      setAlertTitle('Event Theme Required');
      setAlertText('Please select at least one event theme');
      return;
    }
    if (selectedThemes.length > 3) {
      setIsAlertOpen(true);
      setAlertTitle('Event Theme Exceeded');
      setAlertText('You cannot select more than 3 themes');
      return;
    }
    if (!coverPhoto) {
      setIsAlertOpen(true);
      setAlertTitle('Cover Photo Required');
      setAlertText('Please select a cover photo for the event');
      return;
    }
    if (rules.length === 0) {
      setIsAlertOpen(true);
      setAlertTitle('Event Rules Required');
      setAlertText('Please enter at least one event rule');
      return;
    }
    if (!minParticipants) {
      setIsAlertOpen(true);
      setAlertTitle('Participant Lower Limit Required');
      setAlertText('Please enter minimum participants required for the event');
      return;
    }
    if (minParticipants === '0') {
      setIsAlertOpen(true);
      setAlertTitle('Participant Lower Limit Required');
      setAlertText('Minimum participants cannot be 0');
      return;
    }
    if (maxParticipants === '0') {
      setIsAlertOpen(true);
      setAlertTitle('Participant Upper Limit Error');
      setAlertText('Maximum participants cannot be 0');
      return;
    }
    if (maxParticipants && maxParticipants <= minParticipants) {
      setIsAlertOpen(true);
      setAlertTitle('Participant Upper Limit Error');
      setAlertText(
        'Maximum participants cannot be less than or equal to minimum participants',
      );
      return;
    }

    if (differenceInDays(endTime, startTime) !== 0) {
      setIsAlertOpen(true);
      setAlertTitle('Event Time Error');
      setAlertText('Event end time is more than a day after start time');
      return;
    }

    if (differenceInMinutes(endTime, startTime) < 30) {
      setIsAlertOpen(true);
      setAlertTitle('Event Time Error');
      setAlertText('Event must last at least 30 minutes');
      return;
    }
    if (!location) {
      setIsAlertOpen(true);
      setAlertTitle('Event Location Required');
      setAlertText('Please enter a location for the event');
      return;
    }

    const eventPhotosBase64 = eventPhotos.map(photo => photo.base64);
    const postData = {
      name,
      description,
      issueIds: selectedThemes,
      minParticipants: +minParticipants,
      coverImage: coverPhoto.base64,
      images: eventPhotosBase64,
      rules,
      starttime: startTime,
      endtime: endTime,
      location: location.description,
      latitude: location.lat,
      longitude: location.lng,
    };

    if (maxParticipants) {
      postData.maxParticipants = +maxParticipants;
    }

    setLoading(true);

    try {
      const result = await axios.post('/events', postData);
      if (result.data.success) {
        resetStates();
        navigation.navigate(SCREENS.VIEW_EVENT, {event: result.data.data});
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const resetStates = () => {
    setName('');
    setDescription('');
    setCoverPhoto(null);
    setEventPhotos([]);
    setSelectedThemes([]);
    setRules([]);
    setRule('');
    setMinParticipants('');
    setMaxParticipants('');
    setLocation(null);
    setStartTime(null);
    setEndTime(null);
  };

  return (
    <SafeAreaView>
      <Header />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={style.pageContainer}
          keyboardShouldPersistTaps="handled">
          <View style={style.addImageBtn}>
            <TouchableOpacity onPress={() => handleChooseCoverPhoto()}>
              {coverPhoto?.uri ? (
                <Image
                  source={{uri: coverPhoto.uri}}
                  style={style.coverPhoto}
                />
              ) : (
                <Image source={AddImageBtn} width={100} />
              )}
            </TouchableOpacity>
            <Alert
              alertTitle={alertTitle}
              alertText={alertText}
              onClose={alertCloseHandler}
              isOpen={isAlertOpen}
            />
          </View>
          <View style={style.formContainer}>
            <View style={style.nameInput}>
              <Text style={style.fieldText}>Name of the Event*</Text>
              <TextInput value={name} onChangeText={text => setName(text)} />
            </View>
            <View style={style.descriptionInput}>
              <Text style={style.fieldText}>Description*</Text>
              <TextArea
                placeholder={'Description of the event'}
                backgroundColor="white"
                value={description}
                onChangeText={text => setDescription(text)}
                maxHeight={100}
              />
            </View>
            <View style={style.descriptionInput}>
              <Text style={style.fieldText}>Participant Limit</Text>
              <View style={style.participantLimitContainer}>
                <View style={style.limitContainer}>
                  <Text>Min*</Text>
                  <TextInput
                    placeholder="Min"
                    keyboardType="numeric"
                    {...style.limitInput}
                    onChangeText={text =>
                      participantOnChangeHandler('min', text)
                    }
                    value={minParticipants}
                  />
                </View>
                <View style={style.limitContainer}>
                  <Text>Max</Text>
                  <TextInput
                    placeholder="Max"
                    keyboardType="numeric"
                    {...style.limitInput}
                    onChangeText={text =>
                      participantOnChangeHandler('max', text)
                    }
                    value={maxParticipants}
                  />
                </View>
              </View>
            </View>
            <View style={style.descriptionInput}>
              <Text style={style.fieldText}>Event Timing*</Text>
              <View style={style.timingContainer}>
                <Text>Start Time</Text>
                <View style={style.timingInputContainer}>
                  <TextInput
                    onPressIn={() => showDatepicker('start')}
                    showSoftInputOnFocus={false}
                    placeholder="Start Date"
                    value={getDayAndDate(startTime)}
                    {...style.timingInput}
                  />
                  <TextInput
                    onPressIn={() => showTimepicker('start')}
                    showSoftInputOnFocus={false}
                    placeholder="Start Time"
                    value={getTime(startTime)}
                    {...style.timingInput}
                  />
                </View>
              </View>
              <View style={style.timingContainer}>
                <Text>End Time</Text>
                <View style={style.timingInputContainer}>
                  <TextInput
                    onPressIn={() => showDatepicker('end')}
                    showSoftInputOnFocus={false}
                    placeholder="End Date"
                    value={getDayAndDate(endTime)}
                    {...style.timingInput}
                  />
                  <TextInput
                    onPressIn={() => showTimepicker('end')}
                    showSoftInputOnFocus={false}
                    placeholder="End Time"
                    value={getTime(endTime)}
                    {...style.timingInput}
                  />
                </View>
              </View>
              {startTimePickerShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={startTime}
                  mode={mode}
                  is24Hour={true}
                  onChange={(e, date) =>
                    onDateTimePickerChange(e, date, 'start')
                  }
                  minimumDate={new Date()}
                />
              )}
              {endTimePickerShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={endTime}
                  mode={mode}
                  is24Hour={true}
                  onChange={(e, date) => onDateTimePickerChange(e, date, 'end')}
                  minimumDate={new Date()}
                />
              )}
            </View>
            <View style={style.descriptionInput}>
              <Text style={style.fieldText}>Rules for the Event*</Text>
              {rules.length > 0 &&
                rules.map((item, index) => (
                  <View key={index} style={style.ruleContainer}>
                    <Text style={style.ruleText}>
                      {'\u2022'}&nbsp;&nbsp;{item}
                    </Text>
                    <TouchableOpacity onPress={() => deleteRuleHandler(index)}>
                      <Image source={TrashCan} width={10} />
                    </TouchableOpacity>
                  </View>
                ))}
              <Button
                title="Add Rule"
                styleForButtonContainer={style.addRuleBtnContainer}
                styleForButton={style.addRuleBtn}
                onPress={() => setIsRuleAlertOpen(true)}
              />
              <Alert
                alertTitle="Add Rules"
                onClose={ruleAlertCloseHandler}
                isOpen={isRuleAlertOpen}>
                <TextArea
                  borderColor="black"
                  placeholder="Add Rule"
                  value={rule}
                  onChangeText={text => setRule(text)}
                />
                <Button
                  title="ADD"
                  styleForButtonContainer={style.addRuleAlertBtnContainer}
                  styleForButton={style.addRuleAlertBtn}
                  onPress={() => addRuleHandler(rule)}
                />
              </Alert>
            </View>
            <View style={style.uploadPictures}>
              <Text style={style.fieldText}>Upload Pictures:</Text>
              <TouchableOpacity onPress={() => uploadPictures()}>
                <Image source={UploadPicturesBtn} />
              </TouchableOpacity>
            </View>
            {eventPhotos.map((item, index) => (
              <View style={style.uploadedImageContainer} key={index}>
                <Image source={{uri: item.uri}} style={style.uploadedImage} />
                <TouchableOpacity onPress={() => deleteEventPhoto(index)}>
                  <Image
                    source={TrashCan}
                    resizeMode="cover"
                    width={10}
                    height={10}
                  />
                </TouchableOpacity>
              </View>
            ))}
            <View style={style.locationInput}>
              <TouchableOpacity style={style.locationIcon}>
                <Image source={LocationIcon} />
              </TouchableOpacity>
              <View style={style.placesContainer}>
                <GooglePlacesInput setLocation={setLocation} />
              </View>
            </View>
            <View style={style.selectThemes}>
              <Text style={style.fieldText}>Select Event Theme(s)*:</Text>
              <View style={style.themesContainer}>
                {issues.length > 0 &&
                  issues.map(item => (
                    <View style={style.themeBtn} key={item.id}>
                      {selectedThemes.length > 0 &&
                      selectedThemes.includes(item.id) ? (
                        <TouchableOpacity
                          onPress={() => unselectThemeAction(item.id)}>
                          <Badge
                            bg={item.color}
                            style={style.badgeStyle}
                            borderWidth={2}
                            borderColor={item.color}
                            rounded="full"
                            _text={{fontSize: 15, color: 'white'}}>
                            {item.name}
                          </Badge>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => selectThemeAction(item.id)}>
                          <Badge
                            variant={'outline'}
                            borderWidth={2}
                            borderColor={item.color}
                            style={style.badgeStyle}
                            rounded="full"
                            _text={{fontSize: 15, color: item.color}}>
                            {item.name}
                          </Badge>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
              </View>
            </View>
          </View>
          <Button
            title="CREATE EVENT"
            styleForButtonContainer={style.btnContainer}
            styleForButton={style.btn}
            onPress={handleSubmit}
            isLoading={loading}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AddEvent;

const styles = theme =>
  StyleSheet.create({
    pageContainer: {
      margin: '5%',
    },
    addImageBtn: {
      alignItems: 'center',
    },
    formContainer: {
      marginTop: '7%',
      marginLeft: '3%',
    },
    fieldText: {
      color: 'black',
      marginRight: '2%',
      fontSize: theme.typography.size.S,
      fontFamily: 'Lora-Bold',
      marginBottom: '2%',
    },
    coverPhoto: {
      width: 400,
      height: 200,
    },
    nameInput: {
      width: '96%',
      height: 40,
      marginBottom: '2%',
    },
    descriptionInput: {
      marginTop: 20,
      width: '96%',
    },
    uploadPictures: {
      marginTop: 10,
      flexDirection: 'row',
      marginBottom: 10,
    },
    locationInput: {
      flexDirection: 'row',
      height: 30,
      alignItems: 'center',
      width: '90%',
      position: 'relative',
      marginTop: '5%',
    },
    locationIcon: {
      position: 'absolute',
      top: '50%',
    },
    selectThemes: {
      marginTop: 30,
    },
    themesContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    themeBtn: {
      marginEnd: 10,
      marginVertical: 4,
    },
    badgeStyle: {
      alignItems: 'center',
      alignContent: 'center',
      height: 33,
    },
    unselectedBadgeStyle: {
      alignItems: 'center',
      alignContent: 'center',
      height: 40,
    },
    uploadedImageContainer: {
      paddingVertical: 5,
      flex: 1,
      justifyContent: 'space-between',
      marginRight: 10,
      alignContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    uploadedImage: {
      width: 80,
      height: 80,
      borderRadius: 10,
    },
    btnContainer: {
      backgroundColor: theme.colors.GREEN_400,
      width: '80%',
      marginBottom: '20%',
      borderRadius: 10,
      alignSelf: 'center',
      paddingVertical: 5,
      marginVertical: '5%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    btn: {
      color: 'white',
      fontSize: theme.typography.size.L,
      fontFamily: 'Lora-Regular',
    },
    addRuleBtnContainer: {
      backgroundColor: theme.colors.GREEN_400,
      width: '80%',
      borderRadius: 10,
      alignSelf: 'center',
      paddingVertical: 5,
      marginVertical: '2%',
    },
    addRuleBtn: {
      color: 'white',
      fontSize: theme.typography.size.M,
      fontFamily: 'Lora-Medium',
    },
    addRuleAlertBtnContainer: {
      backgroundColor: theme.colors.GREEN_400,
      width: '100%',
      borderRadius: 10,
      alignSelf: 'center',
      paddingVertical: 5,
      marginTop: '5%',
    },
    addRuleAlertBtn: {
      color: 'white',
      fontSize: theme.typography.size.S,
      fontFamily: 'Lora-Medium',
    },
    ruleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: '2%',
    },
    ruleText: {
      fontSize: theme.typography.size.XS,
      fontFamily: 'Lora-Medium',
      maxWidth: '90%',
    },
    participantLimitContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    limitContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: '2%',
    },
    limitInput: {
      width: '45%',
      marginLeft: '5%',
    },
    timingContainer: {
      marginVertical: '2%',
    },
    timingInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '2%',
      justifyContent: 'space-between',
    },
    timingInput: {
      width: '45%',
    },
    placesContainer: {
      height: 200,
      position: 'absolute',
      top: 0,
      right: 0,
      left: 20,
    },
  });
