import {StyleSheet, Text, ActivityIndicator, FlatList} from 'react-native';
import React from 'react';
import useThemedStyles from '../hooks/useThemedStyles';
import EventCard from './EventCard';

const EventsList = ({isLoading = true, events = [], flatListStyle = {}}) => {
  const style = useThemedStyles(styles);

  return isLoading ? (
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
      style={flatListStyle}
    />
  );
};

export default EventsList;

const styles = theme =>
  StyleSheet.create({
    noEventsText: {
      fontSize: theme.typography.size.L,
      color: 'black',
      textAlign: 'center',
      marginTop: 20,
    },
  });
