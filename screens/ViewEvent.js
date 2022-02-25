import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import useThemedStyles from '../hooks/useThemedStyles';
import CustomCarousel from '../components/CustomCarousel';
import Avatar from '../components/Avatar';
import CalendarIcon from '../public/icons/calendar.png';
import ClockIcon from '../public/icons/clock.png';
import {getDayAndDate, getTimeAndTimezone} from '../helper';
import IssueTypeView from '../components/IssueTypeView';
import SmallEventCard from '../components/SmallEventCard';
import {Dimensions} from 'react-native';
import Button from '../components/Button';

const windowWidth = Dimensions.get('window').width;

const ViewEvent = ({route}) => {
  const {event, suggestedEvents} = route.params;
  const {user, issues} = event;
  const images = Array(5).fill(event.picturepath);

  const themedStyles = useThemedStyles(styles);

  const renderImageItem = ({item}) => (
    <Image
      source={{uri: item}}
      style={themedStyles.imageItem}
      resizeMode="cover"
    />
  );

  const renderEventItem = ({item}) => {
    return <SmallEventCard item={item} />;
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomCarousel
          data={images}
          renderItem={renderImageItem}
          paginationOnTop
        />
        <View style={themedStyles.detailsContainer}>
          <Text style={themedStyles.name}>{event.name}</Text>
          <View style={themedStyles.userDetails}>
            <Avatar path={user.profilepicpath} />
            <Text style={themedStyles.userDetailsCreatorText}>
              Created by{' '}
              <Text style={themedStyles.userDetailsCreatorName}>
                {user.firstname}
              </Text>
            </Text>
          </View>
          <ScrollView style={themedStyles.scrollView} nestedScrollEnabled>
            <Text style={themedStyles.scrollViewText}>{event.description}</Text>
          </ScrollView>
          <View style={themedStyles.timeContainer}>
            <Image source={CalendarIcon} style={themedStyles.timeImage} />
            <Text style={themedStyles.timeText}>
              {getDayAndDate(event.starttime)}
            </Text>
          </View>
          <View style={themedStyles.timeContainer}>
            <Image source={ClockIcon} style={themedStyles.clockImage} />
            <Text style={themedStyles.timeText}>
              {getTimeAndTimezone(event.starttime)}
            </Text>
          </View>
          {issues.length > 0 && (
            <View style={themedStyles.issueTypesContainer}>
              {issues.map(issue => (
                <IssueTypeView
                  issueType={issue.name}
                  key={issue.id}
                  size="big"
                />
              ))}
            </View>
          )}
        </View>
        <View style={themedStyles.similarEventsContainer}>
          <Text style={themedStyles.similarEventsHeading}>Similar Events</Text>
          <CustomCarousel
            data={suggestedEvents}
            renderItem={renderEventItem}
            width={windowWidth - windowWidth / 3}
          />
          <Button
            title="JOIN EVENT"
            styleForButtonContainer={themedStyles.btnContainer}
            styleForButton={themedStyles.btn}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewEvent;

const styles = theme =>
  StyleSheet.create({
    imageItem: {
      width: '100%',
      height: 150,
    },
    name: {
      fontSize: theme.typography.size.L,
      marginVertical: 10,
      fontWeight: '700',
      textAlign: 'center',
      color: 'black',
    },
    detailsContainer: {
      paddingHorizontal: 10,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.GRAY_200,
      paddingBottom: 5,
    },
    userDetails: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userDetailsCreatorText: {
      fontSize: theme.typography.size.S,
      fontWeight: '700',
      marginLeft: 10,
      color: 'black',
      marginTop: -5,
    },
    userDetailsCreatorName: {
      textDecorationLine: 'underline',
    },
    scrollView: {
      height: 100,
      marginVertical: 10,
    },
    scrollViewText: {
      color: theme.colors.GRAY_200,
      fontSize: theme.typography.size.S,
      fontWeight: '500',
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    timeImage: {
      marginRight: 10,
      width: 20,
      height: 20,
    },
    clockImage: {
      marginRight: 10,
      width: 23,
      height: 23,
    },
    timeText: {
      fontSize: theme.typography.size.S,
      fontWeight: '500',
      color: theme.colors.GRAY_200,
    },
    issueTypesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
    similarEventsContainer: {
      marginTop: 5,
      marginBottom: 40,
    },
    similarEventsHeading: {
      fontSize: theme.typography.size.XL,
      fontStyle: 'italic',
      marginLeft: 30,
      color: theme.colors.GRAY_200,
    },
    btnContainer: {
      backgroundColor: theme.colors.GREEN_400,
      width: '80%',
      borderRadius: 10,
      alignSelf: 'center',
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
      color: 'white',
      fontSize: theme.typography.size.L,
    },
  });