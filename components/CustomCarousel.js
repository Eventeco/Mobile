import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import useThemedStyles from '../hooks/useThemedStyles';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const CustomCarousel = ({data, renderItem, width, paginationOnTop}) => {
  const themedStyles = useThemedStyles(styles);

  const [sliderIndex, setSliderIndex] = useState(0);

  const sliderIndexHandler = index => {
    setSliderIndex(index);
  };

  const customPaginationStyles = {
    position: paginationOnTop ? 'absolute' : 'relative',
    bottom: paginationOnTop ? -10 : 10,
    backgroundColor: paginationOnTop
      ? 'rgba(255, 255, 255, 0.8)'
      : 'transparent',
  };

  const paginationStyle = StyleSheet.compose(
    themedStyles.pagination,
    customPaginationStyles,
  );

  const slideStyle = {
    marginLeft: -40,
    marginRight: 60,
  };

  const customDotsStyle = {
    width: paginationOnTop ? 8 : 10,
    height: paginationOnTop ? 8 : 10,
    backgroundColor: paginationOnTop ? 'green' : '#45634C',
    borderColor: 'black',
    borderWidth: paginationOnTop ? 0 : 2,
  };

  const dotsStyle = StyleSheet.compose(themedStyles.dotStyle, customDotsStyle);
  const inactiveDotStyle = {
    backgroundColor: paginationOnTop ? 'black' : '#A1BD9D',
  };

  return (
    <View style={themedStyles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        itemWidth={width || windowWidth}
        sliderWidth={windowWidth}
        onSnapToItem={index => sliderIndexHandler(index)}
        slideStyle={!paginationOnTop ? slideStyle : null}
      />
      <View style={themedStyles.paginationContainer}>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={sliderIndex}
          containerStyle={paginationStyle}
          dotStyle={dotsStyle}
          inactiveDotStyle={inactiveDotStyle}
          inactiveDotScale={paginationOnTop ? 0.7 : 1}
          dotContainerStyle={themedStyles.dotContainerStyle}
        />
      </View>
    </View>
  );
};

export default CustomCarousel;

const styles = () =>
  StyleSheet.create({
    container: {
      position: 'relative',
      overflow: 'hidden',
    },
    paginationContainer: {
      alignItems: 'center',
    },
    pagination: {
      borderRadius: 10,
    },
    dotStyle: {
      borderRadius: 5,
    },
    dotContainerStyle: {
      height: 0,
    },
  });
