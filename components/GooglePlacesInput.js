import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from '@env';

const GooglePlacesInput = ({setLocation, location}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder= "Enter the location"
      fetchDetails={true}
      onPress={(data, details = null) => {
        setLocation({
          description: data.description,
          lat: details.geometry.location.lat.toFixed(6),
          lng: details.geometry.location.lng.toFixed(6),
        });
      }}
      query={{
        key: GOOGLE_MAPS_API_KEY,
        language: 'en',
      }}
      styles={{
        container: {zIndex: 10},
      }}
      debounce={200}
    />
  );
};

export default GooglePlacesInput;
