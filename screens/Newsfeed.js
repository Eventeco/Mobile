import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from '../axios';
import BG from '../public/images/Background.png';
import useThemedStyles from '../hooks/useThemedStyles';
import EventCard from '../components/EventCard';
import Header from '../components/Header';

const Newsfeed = () => {
  const style = useThemedStyles(styles);

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryParams, setQueryParams] = useState({
    name: '',
    description: '',
    type: '',
    isDonationEnabled: false,
    issues: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get('/events', {
          params: queryParams,
        });
        setEvents(result.data.data);
      } catch (e) {
        console.log(e.response.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [queryParams]);

  return (
    <SafeAreaView>
      <Header showSearchIcon={true} setQueryParams={setQueryParams} />
      <ImageBackground source={BG} style={style.bgImageContainer}>
        <View style={style.innerContainer}>
          <Text style={style.eventsText}>Events Near You :</Text>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={events}
              renderItem={item => <EventCard event={item.item} />}
              keyExtractor={item => item.id}
              scrollEnabled
              ListEmptyComponent={
                <Text style={style.noEventsText}>No events found</Text>
              }
              style={style.flatList}
            />
          )}
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
