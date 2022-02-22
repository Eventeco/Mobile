import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import useThemedStyles from '../hooks/useThemedStyles';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const CustomCarousel = ({data, renderItem}) => {
  const themedStyles = useThemedStyles(styles);

  const [sliderIndex, setSliderIndex] = useState(0);

  const sliderIndexHandler = index => {
    setSliderIndex(index);
  };

  return (
    <View style={themedStyles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        itemWidth={windowWidth}
        sliderWidth={windowWidth}
        onSnapToItem={index => sliderIndexHandler(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={sliderIndex}
        containerStyle={themedStyles.pagination}
        dotStyle={themedStyles.dotStyle}
        inactiveDotStyle={themedStyles.inactiveDotStyle}
        inactiveDotScale={0.7}
        dotContainerStyle={themedStyles.dotContainerStyle}
      />
    </View>
  );
};

export default CustomCarousel;

const styles = theme =>
  StyleSheet.create({
    container: {
      position: 'relative',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 150,
    },
    pagination: {
      position: 'absolute',
      bottom: -10,
      left: '50%',
      transform: [{translateX: -windowWidth / 5}],
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 10,
    },
    dotStyle: {
      width: 8,
      height: 8,
      borderRadius: 5,
      backgroundColor: 'green',
    },
    inactiveDotStyle: {
      backgroundColor: 'black',
    },
    dotContainerStyle: {
      height: 0,
    },
  });
