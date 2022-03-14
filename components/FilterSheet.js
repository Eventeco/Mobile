import React, {useState, useEffect} from 'react'
import { Actionsheet, Box, Text, Input, Badge, Radio, Switch } from 'native-base'
import { TouchableOpacity } from 'react-native'
import axios from '../axios'

const FilterSheet = ({ isOpen, onClose, setQueryParams, setName, name }) => {
  const [issue, setIssue] = useState([])
  const [issues, setIssues] = useState([])
  const [type, setType] = useState("")
  const [description, setDescription] = useState('')
  const [donation, setDonation] = useState(false)

  useEffect(() => {
    const getIssueTypes = async () => {
      try {
        const res = await axios.get('/issueTypes');
        setIssues(res.data.data)
      } catch (e) {
        console.log(e);
      }
    };

    getIssueTypes();
  }, []);



  useEffect(() => {
    setQueryParams({
      "name": name,
      "description": description,
      "type": type,
      "isDonationEnabled": donation,
      "issues": issue.toString()
    })
  }, [name, issue, type, description, donation])

  const removeIssue = (item) => {
    const indexRemove = issue.indexOf(item)
    issue.splice(indexRemove, 1)
    setIssue([...issue])
  }
  return (
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item key={'name'} height="10">
            <Box width="100%" flexDirection="row" alignItems="center">
              <Text width="100">
                Name:
              </Text>
              <Input value={name} onChangeText={setName} _focus={{ borderColor: 'green.400'}} width="70%" height="9" />
            </Box>
          </Actionsheet.Item>
          <Actionsheet.Item key={'desc'} height="10">
            <Box width="100%" flexDirection="row" alignItems="center">
              <Text width="100">
                Description
              </Text>
              <Input value={description} onChangeText={setDescription} _focus={{ borderColor: 'green.400'}} width="70%" height="9" />
            </Box>
          </Actionsheet.Item>
          <Actionsheet.Item key={'issues'} height="100" flexDirection="row">
            <Text width="120">
              Issues
            </Text>
            <Box width="100%" flexDirection="row" flex={1} flexWrap={'wrap'} alignItems="center">
              {issues.map((item) => (
                <Box key={item.name}>
                  {issue.includes(item.id) ? (
                    <TouchableOpacity onPress={() => removeIssue(item.id)}>
                      <Badge bg={item.color} borderWidth={2} borderColor={item.color}  rounded="full" _text={{ fontSize: 10, color: 'white' }} marginX={0.5} marginY={1}>
                        {item.name}
                      </Badge>
                    </TouchableOpacity>
                  ):(
                    <TouchableOpacity onPress={() => setIssue(prevState => [...prevState, item.id])}>
                      <Badge marginY={0.5} marginX={0.5} variant={'outline'} borderWidth={2} borderColor={item.color} rounded="full" _text={{ fontSize: 10, color: item.color }}>
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
              <Text width="100">
                Type
              </Text>
              <Radio.Group flexDirection="row" name="myRadioGroup" value={type} onChange={nextValue => {
                setType(nextValue);
              }}>
                <Radio colorScheme={'green'} value="normal" my={1}>
                  <Text marginLeft={2} marginRight={4}>
                    Normal
                  </Text>
                </Radio>
                <Radio colorScheme={'green'} value="recurring" my={1}>
                  <Text marginLeft={2}>
                    Recurring
                  </Text>
                </Radio>
              </Radio.Group>
            </Box>
          </Actionsheet.Item>
          <Actionsheet.Item key={'donaction'} height="10">
            <Box width="100%" flexDirection="row" alignItems="center">
              <Text width="100">
                Donation
              </Text>
              <Switch onThumbColor={'green.400'} value={donation} onToggle={() => setDonation(!donation)} colorScheme={'green'} />
            </Box>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
  )
}

export default FilterSheet

