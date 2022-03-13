import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import JoinEventCard from '../components/JoinEventCard';
import useThemedStyles from '../hooks/useThemedStyles';
import React from 'react';
import Header from '../components/Header';

const JoinEvent = ({route}) => {
  const {event} = route.params;

  const style = useThemedStyles(styles);

  return (
    <SafeAreaView>
      <Header showBackButton />
      <View style={style.container}>
        <JoinEventCard event={event} />
      </View>
    </SafeAreaView>
  );
};

export default JoinEvent;

const styles = theme =>
  StyleSheet.create({
    container: {
      margin: '5%',
      height: '100%',
    },
  });
