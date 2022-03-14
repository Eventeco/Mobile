import React, {useState} from 'react';
import {Actionsheet, Box, Text, Input, Badge, Radio, Switch} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useStateValue} from '../StateProvider/StateProvider';

const FilterSheet = ({isOpen, onClose}) => {
  const [issue, setIssue] = useState(['Deforestation']);
  const [type, setType] = useState('one');
  const [donation, setDonation] = useState(false);

  const [{issues}] = useStateValue();

  const removeIssue = item => {
    const indexRemove = issue.indexOf(item);
    issue.splice(indexRemove, 1);
    setIssue([...issue]);
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Actionsheet.Item key={'name'} height="10">
          <Box width="100%" flexDirection="row" alignItems="center">
            <Text width="100">Name:</Text>
            <Input _focus={{borderColor: 'green.400'}} width="70%" height="9" />
          </Box>
        </Actionsheet.Item>
        <Actionsheet.Item key={'desc'} height="10">
          <Box width="100%" flexDirection="row" alignItems="center">
            <Text width="100">Description</Text>
            <Input _focus={{borderColor: 'green.400'}} width="70%" height="9" />
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
                {issue.includes(item.name) ? (
                  <TouchableOpacity onPress={() => removeIssue(item.name)}>
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
                      setIssue(prevState => [...prevState, item.name])
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
        <Actionsheet.Item height="20" key={'type'}>
          <Box height="20" width="100%" flexDirection="row" alignItems="center">
            <Text width="100">Type</Text>
            <Radio.Group
              flexDirection="row"
              name="myRadioGroup"
              value={type}
              onChange={nextValue => {
                setType(nextValue);
              }}>
              <Radio colorScheme={'green'} value="one" my={1}>
                <Text marginLeft={2} marginRight={4}>
                  Normal
                </Text>
              </Radio>
              <Radio colorScheme={'green'} value="two" my={1}>
                <Text marginLeft={2}>Recurring</Text>
              </Radio>
            </Radio.Group>
          </Box>
        </Actionsheet.Item>
        <Actionsheet.Item key={'donaction'} height="10">
          <Box width="100%" flexDirection="row" alignItems="center">
            <Text width="100">Donation</Text>
            <Switch
              onThumbColor={'green.400'}
              value={donation}
              onToggle={() => setDonation(!donation)}
              colorScheme={'green'}
            />
          </Box>
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default FilterSheet;
