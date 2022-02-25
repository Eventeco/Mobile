import React, {useCallback, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from '../axios';
import BG from '../public/images/Background.png';
import useThemedStyles from '../hooks/useThemedStyles';
import {useFocusEffect} from '@react-navigation/native';
import EventCard from '../components/EventCard';

const Newsfeed = () => {
  const style = useThemedStyles(styles);

  const [events, setEvents] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchEvents = async () => {
        try {
          const result = await axios.get('/events');
          if (isActive) {
            setEvents(result.data.data);
          }
        } catch (e) {
          console.log(e.response.data);
        }
      };

      fetchEvents();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const getSuggestedEvents = currEvent => {
    return events.filter(event => event.id !== currEvent.id);
  };

  return (
    <SafeAreaView>
      <ImageBackground source={BG} style={style.bgImageContainer}>
        <View style={style.innerContainer}>
          <Text style={style.eventsText}>Events Near You :</Text>
          <FlatList
            data={events}
            renderItem={item => (
              <EventCard
                event={item.item}
                suggestedEvents={getSuggestedEvents(item.item)}
              />
            )}
            keyExtractor={item => item.id}
            scrollEnabled
            ListEmptyComponent={<Text>No events found</Text>}
            style={style.flatList}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Newsfeed;

const styles = theme =>
  StyleSheet.create({
    bgImageContainer: {
      width: '100%',
      height: '100%',
    },
    innerContainer: {
      paddingTop: 20,
      paddingHorizontal: 15,
    },
    eventsText: {
      fontSize: theme.typography.size.M,
      color: 'black',
    },
    flatList: {
      marginBottom: 40,
    },
  });