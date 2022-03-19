import React, {useState, useCallback} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from '../axios';
import Header from '../components/Header';
import StaggerMenu from '../components/Stagger';
import EventCard from '../components/EventCard';
import {useFocusEffect} from '@react-navigation/native';

const CreatedEvents = () => {
  const style = useThemedStyles(styles);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchEvents = async () => {
        setIsLoading(true);
        try {
          const result = await axios.get('/userPastEvents/created');
          if (isActive) {
            setEvents(result.data.data);
          }
        } catch (e) {
          console.log(e.response.data);
        } finally {
          setIsLoading(false);
        }
      };

      fetchEvents();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <SafeAreaView style={style.container}>
      <Header showBackButton />
      <ScrollView>
        <View style={style.innerContainer}>
          <Text style={style.eventsText}>Events that you have created: </Text>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View>
              {events.map(item => (
                <EventCard key={item.id} event={item} />
              ))}
              {events.length <= 0 && (
                <Text style={style.noEventsText}>No events found</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <StaggerMenu isLoading={isLoading} />
    </SafeAreaView>
  );
};

export default CreatedEvents;

const styles = theme =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
    },
    innerContainer: {
      paddingTop: 20,
      paddingHorizontal: 15,
      marginBottom: 150,
    },
    eventsText: {
      fontSize: theme.typography.size.M,
      color: 'black',
    },
    noEventsText: {
      fontSize: theme.typography.size.L,
      color: 'black',
      textAlign: 'center',
      marginTop: 20,
    },
  });
