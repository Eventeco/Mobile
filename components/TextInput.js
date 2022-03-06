import React from 'react'
import { StyleSheet } from 'react-native'
import { Input } from 'native-base';
import useThemedStyles from '../hooks/useThemedStyles';

const TextInput = (props) => {

  const style = useThemedStyles(styles);

  return (
      <Input borderColor='black' placeholder={'Enter the name of the event'} _focus={{ borderColor: "green.500"}} width='100%' height={30} {...props} />
  )
}

export default TextInput;

const styles = theme => StyleSheet.create({
  fieldStyles: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'black',
    width: '100%'
  }
});
