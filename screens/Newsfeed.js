import React, {useEffect, useState, useCallback} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from '../axios';
import BG from '../public/images/Background.png';
import useThemedStyles from '../hooks/useThemedStyles';
import Header from '../components/Header';
import EventsList from '../components/EventsList';
import {useFocusEffect} from '@react-navigation/native';

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

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchEvents = async () => {
        setIsLoading(true);
        try {
          const result = await axios.get('/events', {
            params: queryParams,
          });
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
    }, [queryParams]),
  );

  return (
    <SafeAreaView>
      <Header showSearchIcon={true} setQueryParams={setQueryParams} />
      <ImageBackground source={BG} style={style.bgImageContainer}>
        <View style={style.innerContainer}>
          <Text style={style.eventsText}>Events Near You :</Text>
          <EventsList
            isLoading={isLoading}
            events={events}
            flatListStyle={style.flatList}
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
      marginBottom: 150,
    },
    eventsText: {
      fontSize: theme.typography.size.M,
      color: 'black',
    },
    flatList: {
      marginBottom: 40,
    },
  });
