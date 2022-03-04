import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {formatTimestamp} from '../helper';
import useThemedStyles from '../hooks/useThemedStyles';
import LocationIcon from '../public/icons/location.png';
import ShareIcon from '../public/icons/share.png';
import IssueTypeView from './IssueTypeView';
import {useNavigation} from '@react-navigation/native';
import RadioButton from '../components/RadioButton'
import Button from './Button';

const JoinEventCard = ({event, suggestedEvents}) => {
  const style = useThemedStyles(styles);

  const navigation = useNavigation();
  const [check1, setCheck1] = React.useState(false)
  const [check2, setCheck2] = React.useState(false)

  const {issues} = event;

  const eventRules = [
    "Makesure to do this",
    "Dont do that, it will be harmful",
    "Bring this with you and show it at the entrance",
    "Be human and act human",
    "Please do not do that, act your age",
    "We hope to achieve this from this",
    "Think twice before doing that it may lead to undesirable consequences"
  ]

  console.log(event)

  return (
    event && (
      <ScrollView style={style.container}>
        <Image source={{uri: event.picturepath}} style={style.image} />
        <View style={style.innerContainer}>
          <Text style={style.nameText}>{event.name}</Text>
          <Text style={style.timeText}>{formatTimestamp(event.starttime)}</Text>
          <View style={style.locationContainer}>
            <View style={style.locationLeft}>
              <Image source={LocationIcon} />
              <Text style={style.locationText}>Bilkent Ankara</Text>
              {issues.length > 0 && (
                <View style={style.eventIssuess}>
                  {issues.map(issue => (
                    <IssueTypeView issueType={issue.name} key={issue.id} />
                  ))}
                </View>
              )}
            </View>
            <Image source={ShareIcon} style={style.icon} />
          </View>
          <View style={style.rulesContainer}>
            <Text style={style.rulesHeading}>EVENT RULES:</Text>
            <View style={style.ruleView}>
              <FlatList
                data={eventRules}
                renderItem={({item}) => (
                  <View style={style.ruleItem}>
                    <Text style={style.ruleBullet}>{'\u2022'}&nbsp;&nbsp;</Text>
                    <Text style={style.ruleText}>
                      {item}
                    </Text>
                  </View>
                )}
              />
            </View>
            <View style={style.radioContainer}>
              <View style={style.radioItem}>
                <TouchableOpacity  onPress={() => setCheck1(!check1)}>
                  <RadioButton selected={check1}></RadioButton>
                </TouchableOpacity>
                <Text style={style.radioText}>I agree to the rules set by the event maker</Text>
              </View>
              <View style={style.radioItem}>
                <TouchableOpacity  onPress={() => setCheck2(!check2)}>
                  <RadioButton selected={check2}></RadioButton>
                </TouchableOpacity>
                <Text style={style.radioText}>I agree to EventECO’s
                  <Text style={style.underline}> terms and conditions</Text>
                </Text>
              </View>
            </View>
            <View>
              <Button
                title="JOIN EVENT"
                styleForButtonContainer={style.btnContainer}
                styleForButton={style.btn}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
      paddingVertical: 5,
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
      marginTop: 5,
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
    },
    eventIssuess: {
      flexDirection: 'row',
      marginLeft: 20,
    },
    rulesContainer: {
      marginTop: '2%'    
    },
    rulesHeading: {
      fontSize: theme.typography.size.S,
      color: 'black',
      fontFamily: 'Lora-Bold',
    },
    ruleView: {
      marginLeft: '3%',
      marginRight: '3%'
    },
    ruleItem: {
      flexDirection: 'row'
    },
    ruleBullet: {
      fontSize: theme.typography.size.M
    },
    ruleText: {
      fontSize: theme.typography.size.XS,
      overflow: 'scroll',
      color: 'black',
      fontFamily: 'Lora-Bold',
    },
    radioContainer: {
      margin: '3%',
      marginTop: '5%'
    },
    radioItem: {
      flexDirection: 'row',
      marginTop: '1%'
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
      textDecorationLine: 'underline'
    },
    btnContainer: {
      backgroundColor: theme.colors.GREEN_400,
      width: '80%',
      borderRadius: 10,
      alignSelf: 'center',
      paddingVertical: 5,
      marginBottom: '15%',
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
  });
