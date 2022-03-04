import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import JoinEventCard from '../components/JoinEventCard';
import useThemedStyles from '../hooks/useThemedStyles';
import React from 'react';

const JoinEvent = ({ route }) => {
  const {event, suggestedEvents} = route.params;

  const style = useThemedStyles(styles);

  return (
    <SafeAreaView>
      <ScrollView style={style.scrollView}>
        <JoinEventCard
          event={event}
          suggestedEvents={suggestedEvents}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default JoinEvent;

const styles = theme =>
  StyleSheet.create({
    scrollView: {
      margin: '5%',
      height: '100%'
    }
  });