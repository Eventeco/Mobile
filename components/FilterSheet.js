import React, {useState} from 'react';
import {Actionsheet, Box, Text, Input, Badge, Button} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useStateValue} from '../StateProvider/StateProvider';
import GooglePlacesInput from './GooglePlacesInput';

const FilterSheet = ({isOpen, onClose, setQueryParams, setName, name}) => {
  const [issue, setIssue] = useState([]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState('');
  const [locationText, setLocationText] = useState('');

  const [{issues}] = useStateValue();

  const onSearchPressHandler = () => {
    setQueryParams({
      name: name,
      description: description,
      issues: issue.toString(),
      latitude: location.lat,
      longitude: location.lng,
      radius,
    });
  };

  const removeIssue = item => {
    setIssue(prevState => {
      return prevState.filter(i => i !== item);
    });
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Actionsheet.Item key={'name'} height="10">
          <Box width="100%" flexDirection="row" alignItems="center">
            <Text width="100">Name:</Text>
            <Input
              value={name}
              onChangeText={setName}
              _focus={{borderColor: 'green.400'}}
              width="70%"
              height="9"
            />
          </Box>
        </Actionsheet.Item>
        <Actionsheet.Item key={'desc'} height="10">
          <Box width="100%" flexDirection="row" alignItems="center">
            <Text width="100">Description</Text>
            <Input
              value={description}
              onChangeText={setDescription}
              _focus={{borderColor: 'green.400'}}
              width="70%"
              height="9"
            />
          </Box>
        </Actionsheet.Item>
        <Actionsheet.Item key={'location'} height="20" zIndex={10}>
          <Box
            width="100%"
            flexDirection="row"
            alignItems="center"
            position="relative">
            <Text width="100">Location</Text>
            <Box
              width="240%"
              height="200"
              position="absolute"
              top="-10"
              left={24}>
              <GooglePlacesInput
                setLocation={setLocation}
                locationText={locationText}
                setLocationText={setLocationText}
              />
            </Box>
          </Box>
        </Actionsheet.Item>
        <Actionsheet.Item key={'radius'} height="10">
          <Box width="100%" flexDirection="row" alignItems="center">
            <Text width="100">Radius (km)</Text>
            <Input
              value={radius}
              onChangeText={setRadius}
              _focus={{borderColor: 'green.400'}}
              width="70%"
              height="9"
              keyboardType="numeric"
            />
          </Box>
        </Actionsheet.Item>
        <Actionsheet.Item key={'issues'} height="100" flexDirection="row">
          <Text width="120">Issues</Text>
          <Box
            width="100%"
            flexDirection="row"
            flex={1}
            flexWrap={'wrap'}
            alignItems="center">
            {issues.map(item => (
              <Box key={item.name}>
                {issue.includes(item.id) ? (
                  <TouchableOpacity onPress={() => removeIssue(item.id)}>
                    <Badge
                      bg={item.color}
                      borderWidth={2}
                      borderColor={item.color}
                      rounded="full"
                      _text={{fontSize: 10, color: 'white'}}
                      marginX={0.5}
                      marginY={1}>
                      {item.name}
                    </Badge>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      setIssue(prevState => [...prevState, item.id])
                    }>
                    <Badge
                      marginY={0.5}
                      marginX={0.5}
                      variant={'outline'}
                      borderWidth={2}
                      borderColor={item.color}
                      rounded="full"
                      _text={{fontSize: 10, color: item.color}}>
                      {item.name}
                    </Badge>
                  </TouchableOpacity>
                )}
              </Box>
            ))}
          </Box>
        </Actionsheet.Item>
        <Button
          onPress={onSearchPressHandler}
          colorScheme="green"
          marginTop={1}>
          Search
        </Button>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default FilterSheet;
