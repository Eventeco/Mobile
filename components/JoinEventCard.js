import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {formatTimestamp} from '../helper';
import useThemedStyles from '../hooks/useThemedStyles';
import LocationIcon from '../public/icons/location.png';
import IssueTypeView from './IssueTypeView';
import RadioButton from '../components/RadioButton';
import Button from './Button';
import {Alert} from 'react-native';
import axios from '../axios';
import useTheme from '../hooks/useTheme';
import {useNavigation} from '@react-navigation/native';
import SCREENS from '../constants/screens';

const JoinEventCard = ({event}) => {
  const style = useThemedStyles(styles);
  const theme = useTheme();
  const navigation = useNavigation();

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [isParticipant, setIsParticipant] = useState(false);

  const styleForButtonContainer = StyleSheet.compose(style.btnContainer, {
    backgroundColor: isParticipant ? '#aaa' : theme.colors.GREEN_400,
  });

  const styleForButton = StyleSheet.compose(style.btn, {
    color: isParticipant ? 'black' : 'white',
  });

  const {issues, rules} = event;

  useEffect(() => {
    const fetchIsParticipantData = async () => {
      try {
        const res = await axios.get(
          `/eventParticipants/isParticipant/${event.id}`,
        );
        setIsParticipant(res.data.data);
      } catch (e) {
        Alert.alert('Error', 'Something went wrong');
      }
    };

    fetchIsParticipantData();
  }, [event.id]);

  const submitHandler = async () => {
    if (!check1 || !check2) {
      return Alert.alert(
        "Please agree to the event rules, and EventECO's Terms and Conditions",
      );
    }

    try {
      await axios.get(`/user/check-event/${event.id}`);
      joinEventHandler();
    } catch (e) {
      Alert.alert(
        'Warning',
        'You have already joined another event on the same day. Do you wish to continue?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'OK',
            onPress: joinEventHandler,
          },
        ],
      );
    }
  };

  const joinEventHandler = async () => {
    const postData = {
      eventId: event.id,
    };
    try {
      await axios.post('/eventParticipants', postData);
      navigation.navigate(SCREENS.NEWSFEED);
    } catch (err) {
      Alert.alert('Error', err.response.data.message);
    }
  };

  return (
    event && (
      <View style={style.container}>
        <Image source={{uri: event.picturepath}} style={style.image} />
        <View style={style.innerContainer}>
          <Text style={style.nameText}>{event.name}</Text>
          <Text style={style.timeText}>{formatTimestamp(event.starttime)}</Text>
          <View style={style.locationContainer}>
            <View style={style.locationLeft}>
              <Image source={LocationIcon} />
              <Text style={style.locationText}>{event.location}</Text>
              <ScrollView horizontal>
                {issues.length > 0 && (
                  <View style={style.eventIssuess}>
                    {issues.map(issue => (
                      <IssueTypeView issueType={issue.name} key={issue.id} />
                    ))}
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
          <View style={style.rulesContainer}>
            {rules && rules.length > 0 && (
              <>
                <Text style={style.rulesHeading}>EVENT RULES:</Text>
                <ScrollView style={style.ruleView} nestedScrollEnabled>
                  {rules.map(({rule, id}) => (
                    <View style={style.ruleItem} key={id}>
                      <Text style={style.ruleBullet}>
                        {'\u2022'}&nbsp;&nbsp;
                      </Text>
                      <Text style={style.ruleText}>{rule}</Text>
                    </View>
                  ))}
                </ScrollView>
              </>
            )}
            <View style={style.radioContainer}>
              {rules && rules.length > 0 && (
                <View style={style.radioItem}>
                  <TouchableOpacity onPress={() => setCheck1(!check1)}>
                    <RadioButton selected={check1} />
                  </TouchableOpacity>
                  <Text style={style.radioText}>
                    I agree to the rules set by the event maker
                  </Text>
                </View>
              )}
              <View style={style.radioItem}>
                <TouchableOpacity onPress={() => setCheck2(!check2)}>
                  <RadioButton selected={check2} />
                </TouchableOpacity>
                <Text style={style.radioText}>
                  I agree to EventECO’s
                  <Text style={style.underline}> terms and conditions</Text>
                </Text>
              </View>
            </View>
            <View>
              <Button
                title={
                  isParticipant
                    ? 'ALREADY A PARTICIPANT'
                    : 'CONFIRM PARTICIPATION'
                }
                styleForButtonContainer={styleForButtonContainer}
                styleForButton={styleForButton}
                onPress={submitHandler}
                disabled={isParticipant}
              />
            </View>
          </View>
        </View>
      </View>
    )
  );
};

export default JoinEventCard;

const styles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.BLUE_100,
      marginVertical: 5,
      borderRadius: 20,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 5,
    },
    image: {
      width: '100%',
      height: 100,
      borderRadius: 10,
    },
    innerContainer: {
      paddingTop: 5,
      paddingBottom: 15,
      paddingHorizontal: 10,
    },
    nameText: {
      fontSize: theme.typography.size.M,
      color: 'black',
      fontFamily: 'Lora-Medium',
    },
    timeText: {
      fontSize: theme.typography.size.XS,
      color: 'black',
      fontFamily: 'Lora-Bold',
      marginTop: 2,
    },
    locationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
    },
    locationLeft: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    locationText: {
      color: 'black',
      marginLeft: 10,
      fontSize: theme.typography.size.XS,
      fontFamily: 'Lora-Bold',
      maxWidth: '30%',
    },
    eventIssuess: {
      flexDirection: 'row',
      marginLeft: 20,
    },
    rulesContainer: {
      marginTop: '2%',
    },
    rulesHeading: {
      fontSize: theme.typography.size.S,
      color: 'black',
      fontFamily: 'Lora-Bold',
    },
    ruleView: {
      maxHeight: 120,
      marginLeft: '3%',
      marginRight: '3%',
    },
    ruleItem: {
      flexDirection: 'row',
    },
    ruleBullet: {
      fontSize: theme.typography.size.S,
    },
    ruleText: {
      fontSize: theme.typography.size.XS,
      overflow: 'scroll',
      color: 'black',
      fontFamily: 'Lora-Bold',
    },
    radioContainer: {
      margin: '3%',
      marginTop: '5%',
    },
    radioItem: {
      flexDirection: 'row',
      marginTop: '3%',
    },
    radioText: {
      marginLeft: '3%',
      fontSize: theme.typography.size.XS,
      overflow: 'scroll',
      fontStyle: 'italic',
      color: 'black',
      fontFamily: 'Lora-Bold',
    },
    underline: {
      textDecorationLine: 'underline',
    },
    btnContainer: {
      width: '80%',
      borderRadius: 10,
      alignSelf: 'center',
      marginTop: '3%',
      paddingVertical: 5,
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
      fontSize: theme.typography.size.M,
      fontFamily: 'Lora-Medium',
    },
  });
