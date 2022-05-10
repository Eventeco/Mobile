import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {useState} from 'react/cjs/react.development';

const GooglePlacesInput = ({setLocation, locationText, setLocationText}) => {
  const [rerenders, setRerenders] = useState(0);
  console.log(rerenders);
  return (
    <GooglePlacesAutocomplete
      placeholder="Enter the location"
      fetchDetails={true}
      onPress={(data, details = null) => {
        setLocation({
          description: data.description,
          lat: details.geometry.location.lat.toFixed(6),
          lng: details.geometry.location.lng.toFixed(6),
        });
        setLocationText(data.description);
      }}
      query={{
        key: GOOGLE_MAPS_API_KEY,
        language: 'en',
      }}
      styles={{
        container: {zIndex: 10},
        textInput: {
          color: '#000',
        },
        description: {
          color: '#555',
        },
      }}
      textInputProps={{
        value: locationText,
        onChangeText: text => {
          setRerenders(prevState => {
            if (prevState !== 0) {
              setLocationText(text);
            }
            return prevState + 1;
          });
        },
      }}
      debounce={200}
    />
  );
};

export default GooglePlacesInput;
