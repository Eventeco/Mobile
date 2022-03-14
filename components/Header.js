import React, {useState} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';
import Logo from '../public/images/logo2.png';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../public/icons/back.png';
import {Input, useDisclose} from 'native-base';
import SearchIcon from '../public/icons/search-icon.png';
import FilterIcon from '../public/icons/filter-icon.png';
import FilterSheet from './FilterSheet';

const Header = ({
  showBackButton = false,
  showSearchIcon = false,
  setQueryParams = {},
}) => {
  const style = useThemedStyles(styles);

  const navigation = useNavigation();
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');

  const {isOpen, onOpen, onClose} = useDisclose();
  const backPressHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={style.container}>
      {showBackButton && (
        <TouchableOpacity
          onPress={backPressHandler}
          style={style.backImageContainer}>
          <Image source={BackIcon} style={style.backImage} />
        </TouchableOpacity>
      )}
      {!searchMode ? (
        <View style={style.imageContainer}>
          <Image source={Logo} resizeMode="cover" style={style.image} />
        </View>
      ) : (
        <View width="85%" style={style.inputContainer}>
          <TouchableOpacity
            onPress={() => setSearchMode(false)}
            style={style.backImageContainer}>
            <Image source={BackIcon} style={style.backImage} />
          </TouchableOpacity>
          <View width="90%" style={style.inputField}>
            <Input value={searchText} onChangeText={setSearchText} size="lg" />
          </View>
          <TouchableOpacity onPress={onOpen}>
            <View style={style.filterIcon}>
              <Image source={FilterIcon} resizeMode="cover" />
            </View>
          </TouchableOpacity>
          <FilterSheet
            setQueryParams={setQueryParams}
            name={searchText}
            setName={setSearchText}
            isOpen={isOpen}
            onClose={onClose}
          />
        </View>
      )}
      {showSearchIcon && (
        <View>
          <TouchableOpacity onPress={() => setSearchMode(true)}>
            <Image source={SearchIcon} resizeMode="cover" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;

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
    backImageContainer: {
      width: 20,
      height: 20,
    },
    backImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    filterIcon: {
      marginLeft: 10,
    },
    inputField: {
      marginLeft: 10,
    },
  });
