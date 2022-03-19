import React, { useEffect, useState} from 'react';
import {Text, StyleSheet, View, ActivityIndicator, ScrollView} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from '../axios';
import {useStateValue} from '../StateProvider/StateProvider';
import Header from '../components/Header';
import StaggerMenu from '../components/Stagger';
import EventCard from '../components/EventCard';

const JoinedEvents = ({navigation}) => {
  const style = useThemedStyles(styles);
  const [, dispatch] = useStateValue();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get('/userPastEvents/participated');
        setEvents(result.data.data);
      } catch (e) {
        console.log(e.response.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  console.log(events);

  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <ScrollView>
        <Header />
        <View style={style.innerContainer}>
          <Text style={style.eventsText}>Events that you have joined: </Text>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View>
              {events.map((item) => (
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

export default JoinedEvents;

const styles = theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 60,
      paddingHorizontal: 10,
      backgroundColor: theme.colors.GREEN_200,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageContainer: {
      width: 140,
      height: 20,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
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
    backImageContainer: {
      width: 20,
      height: 20,
    },
    backImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
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
    flatList: {
      marginBottom: 40,
    },
    noEventsText: {
      fontSize: theme.typography.size.L,
      color: 'black',
      textAlign: 'center',
      marginTop: 20,
    },
  });
