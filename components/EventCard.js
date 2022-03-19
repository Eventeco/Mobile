import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatBigString, formatTimestamp} from '../helper';
import useThemedStyles from '../hooks/useThemedStyles';
import LocationIcon from '../public/icons/location.png';
import ShareIcon from '../public/icons/share.png';
import IssueTypeView from './IssueTypeView';
import {useNavigation} from '@react-navigation/native';
import SCREENS from '../constants/screens';
import {BASE_URL} from '../constants';

const EventCard = ({event, suggestedEvents}) => {
  const style = useThemedStyles(styles);

  const navigation = useNavigation();

  const {issues} = event;

  const onPressHandler = () => {
    navigation.navigate(SCREENS.VIEW_EVENT, {event, suggestedEvents});
  };

  return (
    event && (
      <TouchableOpacity style={style.container} onPress={onPressHandler}>
        <Image
          source={{uri: `${BASE_URL}/eventPictures/key/${event.picturepath}`}}
          style={style.image}
        />
        <View style={style.innerContainer}>
          <Text style={style.nameText}>{event.name}</Text>
          <Text style={style.timeText}>{formatTimestamp(event.starttime)}</Text>
          <View style={style.footerContainer}>
            <View style={style.footerLeft}>
              <Image source={LocationIcon} />
              <Text style={style.locationText}>
                {formatBigString(event.location)}
              </Text>
              {issues.length > 0 && (
                <View style={style.footerIssues} horizontal>
                  {issues.map(issue => (
                    <View key={issue.id} style={style.issueContainer}>
                      <IssueTypeView issueType={issue} />
                    </View>
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
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
    },
    footerLeft: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    locationText: {
      color: 'black',
      marginLeft: 10,
      fontSize: theme.typography.size.XS,
      fontFamily: 'Lora-Bold',
    },
    footerIssues: {
      flexDirection: 'row',
      marginLeft: 20,
      maxWidth: 180,
      flexWrap: 'wrap',
    },
    issueContainer: {
      marginBottom: 5,
    },
    participantText: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.GRAY_200,
    },
  });
