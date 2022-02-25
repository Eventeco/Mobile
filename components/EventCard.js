import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatTimestamp} from '../helper';
import useThemedStyles from '../hooks/useThemedStyles';
import LocationIcon from '../public/icons/location.png';
import ShareIcon from '../public/icons/share.png';
import IssueTypeView from './IssueTypeView';
import {useNavigation} from '@react-navigation/native';
import SCREENS from '../constants/screens';

const EventCard = ({event, suggestedEvents}) => {
  const style = useThemedStyles(styles);

  const navigation = useNavigation();

  const {issues} = event;

  const onPressHandler = () => {
    navigation.navigate(SCREENS.JOIN_EVENT, {event, suggestedEvents});
  };

  return (
    event && (
      <TouchableOpacity style={style.container} onPress={onPressHandler}>
        <Image source={{uri: event.picturepath}} style={style.image} />
        <View style={style.innerContainer}>
          <Text style={style.nameText}>{event.name}</Text>
          <Text style={style.timeText}>{formatTimestamp(event.starttime)}</Text>
          <View style={style.footerContainer}>
            <View style={style.footerLeft}>
              <Image source={LocationIcon} />
              <Text style={style.locationText}>{event.location}</Text>
              {issues.length > 0 && (
                <View style={style.footerIssues}>
                  {issues.map(issue => (
                    <IssueTypeView issueType={issue.name} key={issue.id} />
                  ))}
                </View>
              )}
            </View>
            <Image source={ShareIcon} style={style.icon} />
          </View>
        </View>
      </TouchableOpacity>
    )
  );
};

export default EventCard;

const styles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.WHITE_100,
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
      fontSize: theme.typography.size.S,
      color: 'black',
      fontWeight: '700',
    },
    timeText: {
      fontSize: theme.typography.size.XS2,
      color: 'black',
      fontWeight: '700',
      marginTop: 5,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
    },
    footerLeft: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    locationText: {
      color: 'black',
      marginLeft: 10,
      fontSize: theme.typography.size.XS,
      fontWeight: '700',
    },
    footerIssues: {
      flexDirection: 'row',
      marginLeft: 20,
    },
  });
