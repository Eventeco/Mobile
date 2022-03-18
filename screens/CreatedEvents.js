import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from '../axios';
import {useStateValue} from '../StateProvider/StateProvider';
import Header from '../components/Header';
import {Box, useDisclose, IconButton} from 'native-base';
import {Image} from 'react-native';
import StaggerMenu from '../components/Stagger';
import StaggerCircle from '../public/icons/dots-horizontal.png';
import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';

const CreatedEvents = ({navigation}) => {
  const style = useThemedStyles(styles);
  const [, dispatch] = useStateValue();
  const {isOpen, onToggle} = useDisclose();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get('/userPastEvents/created');
        setEvents(result.data.data);
      } catch (e) {
        console.log(e.response.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <Header />
      <ScrollView>
        <View style={style.innerContainer}>
          <Text style={style.eventsText}>Your Created Events: </Text>
          <EventsList
            isLoading={isLoading}
            events={events}
            flatListStyle={style.flatList}
          />
        </View>
      </ScrollView>
      <View style={{flex: 1}}>
        <View
          style={{
            position: 'absolute',
            bottom: 5,
            right: 15,
            alignSelf: 'flex-end',
          }}>
          <Box
            zIndex="10"
            position="absolute"
            right="10%"
            bottom="120%"
            width="120">
            <StaggerMenu onToggle={onToggle} isOpen={isOpen} />
          </Box>
          {!isLoading && (
            <IconButton
              variant="solid"
              borderRadius="full"
              zIndex="10"
              size="lg"
              colorScheme="green"
              onPress={onToggle}
              icon={<Image source={StaggerCircle} />}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreatedEvents;

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
  });
