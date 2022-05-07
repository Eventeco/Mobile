import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
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
import {useFocusEffect} from '@react-navigation/native';
import axios from '../axios';
import SCREENS from '../constants/screens';
import Header from '../components/Header';
import {BASE_URL} from '../constants';
import useTheme from '../hooks/useTheme';
import {useStateValue} from '../StateProvider/StateProvider';
import ParticipentsModal from '../components/ParticipentsModal';
import ParticipantsIcon from '../public/icons/participants.png';
import {
  Badge,
  HStack,
  Text as NativeText,
  Button as NativeBtn,
} from 'native-base';
import LocationIcon from '../public/icons/location.png';
import ConfirmationModal from '../components/ConfirmationModal';
import NewAlert from '../components/Alert';

const windowWidth = Dimensions.get('window').width;

const ViewEvent = ({route, navigation}) => {
  const {event} = route.params;
  const {user, issues, pictures} = event;
  const [showModal, setShowModal] = useState(false);
  const themedStyles = useThemedStyles(styles);
  const theme = useTheme();
  const [isSimilarEventsLoading, setIsSimilarEventsLoading] = useState(false);
  const [isParticipantDataLoading, setIsParticipantDataLoading] =
    useState(false);

  const [{user: loggedInUser}] = useStateValue();

  const images = [
    event.picturepath,
    ...pictures.map(picture => picture.picturepath),
  ];

  const [isParticipant, setIsParticipant] = useState(false);
  const [suggestedEvents, setSuggestedEvents] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [editAlert, setEditAlert] = useState(false)
  const isEventCreator = event.creatorid === loggedInUser.id;

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchSuggestedEvents = async () => {
        setIsSimilarEventsLoading(true);
        try {
          const result = await axios.get(`/events/suggested/${event.id}`);
          if (isActive) {
            setSuggestedEvents(result.data.data);
          }
        } catch (e) {
          console.log(e.response.data);
        } finally {
          setIsSimilarEventsLoading(false);
        }
      };

      fetchSuggestedEvents();

      return () => {
        isActive = false;
      };
    }, [event.id]),
  );

  const styleForButtonContainer = StyleSheet.compose(
    themedStyles.btnContainer,
    {
      backgroundColor: isParticipant ? '#aaa' : theme.colors.GREEN_400,
    },
  );

  const styleForButton = StyleSheet.compose(themedStyles.btn, {
    color: isParticipant ? 'black' : 'white',
  });

  useEffect(() => {
    const fetchIsParticipantData = async () => {
      setIsParticipantDataLoading(true);
      try {
        const res = await axios.get(
          `/eventParticipants/isParticipant/${event.id}`,
        );
        setIsParticipant(res.data.data);
      } catch (e) {
        Alert.alert('Error', 'Something went wrong');
      } finally {
        setIsParticipantDataLoading(false);
      }
    };

    if (!isEventCreator) {
      fetchIsParticipantData();
    }
  }, [event.id, isEventCreator]);

  const renderImageItem = ({item}) => (
    <Image
      source={{uri: `${BASE_URL}/s3/getImage/${item}`}}
      style={themedStyles.imageItem}
      resizeMode="cover"
    />
  );

  const similarEventOnPressHandler = item => {
    navigation.navigate(SCREENS.VIEW_EVENT, {event: item});
  };

  const renderEventItem = ({item}) => {
    return (
      <SmallEventCard
        item={item}
        onPressHandler={() => similarEventOnPressHandler(item)}
      />
    );
  };

  const joinEventButtonHandler = () => {
    navigation.navigate(SCREENS.JOIN_EVENT, {event});
  };

  const deleteEvent = async () => {
    try {
      await axios.delete(`/events/${event.id}`);
      navigation.navigate(SCREENS.NEWSFEED);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={themedStyles.container}>
      <Header showBackButton />
      <ParticipentsModal
        eventId={event.id}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <ConfirmationModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmModal}
        actionOnConfirm={deleteEvent}
      />
      <ScrollView>
        <CustomCarousel
          data={images}
          renderItem={renderImageItem}
          paginationOnTop
        />
        <View style={themedStyles.detailsContainer}>
          <Text style={themedStyles.name}>{event.name}</Text>
          <View style={themedStyles.userDetails}>
            <HStack alignItems="center">
              <Avatar path={`${BASE_URL}/s3/getImage/${user.profilepicpath}`} />
              <Text style={themedStyles.userDetailsCreatorText}>
                Created by{' '}
                <Text style={themedStyles.userDetailsCreatorName}>
                  {user.username}
                </Text>
              </Text>
            </HStack>
            <HStack>
              <Badge colorScheme="green">
                <NativeText color="green.700">
                  {event.participantscount || 0}
                </NativeText>
              </Badge>
              <TouchableOpacity
                disabled={!isEventCreator}
                onPress={() => {
                  setShowModal(true);
                }}>
                <Image
                  style={themedStyles.participantsIcon}
                  resizeMode="contain"
                  source={ParticipantsIcon}
                />
              </TouchableOpacity>
            </HStack>
          </View>
          <ScrollView style={themedStyles.scrollView} nestedScrollEnabled>
            <Text style={themedStyles.scrollViewText}>{event.description}</Text>
          </ScrollView>
          <View style={themedStyles.timeContainer}>
            <Image source={LocationIcon} style={themedStyles.locationImage} />
            <Text style={themedStyles.timeText}>{event.location}</Text>
          </View>
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
          <HStack justifyContent="space-between">
            <HStack alignItems="center">
              <Text style={themedStyles.participantText}>
                Minimum Participants:
              </Text>
              <Badge
                borderRadius="xl"
                colorScheme="green"
                textAlign="center"
                flexDirection="row">
                {event.minparticipants}
              </Badge>
            </HStack>
            <HStack alignItems="center">
              <Text style={themedStyles.participantText}>
                Maximum Participants:
              </Text>
              <Badge
                borderRadius="xl"
                colorScheme="green"
                textAlign="center"
                flexDirection="row">
                {event.maxparticipants ? event.maxparticipants : '∞'}
              </Badge>
            </HStack>
          </HStack>
          {issues.length > 0 && (
            <View style={themedStyles.issueTypesContainer}>
              {issues.map((issue, i) => (
                <IssueTypeView issueType={issue} key={i} size="big" />
              ))}
            </View>
          )}
        </View>
        {isSimilarEventsLoading ? (
          <ActivityIndicator size="large" color={theme.colors.GREEN_400} />
        ) : (
          suggestedEvents.length > 0 && (
            <View style={themedStyles.similarEventsContainer}>
              <Text style={themedStyles.similarEventsHeading}>
                Similar Events
              </Text>
              <CustomCarousel
                data={suggestedEvents}
                renderItem={renderEventItem}
                width={windowWidth - windowWidth / 3}
              />
            </View>
          )
        )}
        {!isEventCreator && event ? (
          <Button
            title={!isParticipant ? 'JOIN EVENT' : 'ALREADY A PARTICIPANT'}
            styleForButtonContainer={styleForButtonContainer}
            styleForButton={styleForButton}
            onPress={joinEventButtonHandler}
            disabled={isParticipant}
            isLoading={isParticipantDataLoading}
          />
        ) : (
          <View flexDirection="row" justifyContent="space-between" alignSelf="center">
            <NewAlert isOpen={deleteAlert} onClose={() => setDeleteAlert(!deleteAlert)} alertTitle="Delete Failed" alertText="You cannot delete an event 5 hours from the starting date, or after the event has been completed." />
            <NewAlert isOpen={editAlert} onClose={() => setEditAlert(!editAlert)} alertTitle="Edit Failed" alertText="You cannot edit an event after it has started." />
            {(new Date(event.starttime) > new Date()) ? (
              <NativeBtn onPress={() => navigation.navigate(SCREENS.EDIT_EVENT, {event})} alignSelf="center" colorScheme="green" width="1/3" mr="1">
                EDIT EVENT
              </NativeBtn>
            ):(
              <NativeBtn onPress={() => setEditAlert(true)} colorScheme="gray" width="1/3" mr="1">
                EDIT EVENT
              </NativeBtn>
            )}
            {(new Date(event.starttime) - new Date())/1000 > 18000 ? (
              <NativeBtn onPress={() => setShowConfirmModal(true)} colorScheme="red" alignSelf="center" ml="1" width="1/3">
                DELETE EVENT
              </NativeBtn>
            ):(
              <NativeBtn onPress={() => setDeleteAlert(true)} colorScheme="gray" alignSelf="center" ml="1" width="1/3">
                DELETE EVENT
              </NativeBtn>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewEvent;

const styles = theme =>
  StyleSheet.create({
    container: {
      marginBottom: 100,
    },
    imageItem: {
      width: '100%',
      height: 150,
    },
    name: {
      fontSize: theme.typography.size.L,
      marginVertical: 10,
      textAlign: 'center',
      color: 'black',
      fontFamily: 'Lora-Medium',
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
      justifyContent: 'space-between',
    },
    userDetailsCreatorText: {
      fontSize: theme.typography.size.S,
      marginLeft: 10,
      color: 'black',
      marginTop: -5,
      fontFamily: 'Lora-Bold',
    },
    userDetailsCreatorName: {
      textDecorationLine: 'underline',
    },
    scrollView: {
      maxHeight: 100,
      marginVertical: 10,
    },
    scrollViewText: {
      color: theme.colors.GRAY_200,
      fontSize: theme.typography.size.S,
      fontFamily: 'Lora-Bold',
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
      fontSize: theme.typography.size.XS,
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
      marginBottom: 40
    },
    similarEventsHeading: {
      fontSize: theme.typography.size.XL,
      marginLeft: 30,
      fontFamily: 'Lora-Italic',
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
      fontFamily: 'Lora-Regular',
    },
    participantText: {
      fontSize: theme.typography.size.XS,
      fontWeight: '500',
      color: theme.colors.GRAY_200,
    },
    participantsIcon: {
      width: 30,
      height: 30,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationImage: {
      marginRight: 10,
      width: 18,
      height: 18,
      tintColor: theme.colors.GRAY_200,
    },
  });
