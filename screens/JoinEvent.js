import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import useThemedStyles from '../hooks/useThemedStyles';
import CustomCarousel from '../components/CustomCarousel';

const JoinEvent = ({route}) => {
  const {event} = route.params;
  const images = Array(5).fill(event.picturepath);

  const themedStyles = useThemedStyles(styles);

  const renderItem = ({item}) => (
    <Image source={{uri: item}} style={themedStyles.image} resizeMode="cover" />
  );

  return (
    <SafeAreaView>
      <CustomCarousel data={images} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default JoinEvent;

const styles = theme =>
  StyleSheet.create({
    image: {
      width: '100%',
      height: 150,
    },
  });
