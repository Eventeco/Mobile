import React from 'react';
import {Input} from 'native-base';

const TextInput = props => {
  return (
    <Input
      backgroundColor="white"
      placeholder={props.placeholder || 'Enter the name of the event'}
      _focus={{borderColor: 'green.500'}}
      width="100%"
      height={30}
      keyboardType={props.keyboardType || 'default'}
      {...props}
    />
  );
};

export default TextInput;
