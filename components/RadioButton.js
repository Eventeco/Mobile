import React from 'react';
import { View } from 'react-native'

function RadioButton(props) {
  return (
      <View style={[{
        height: 18,
        width: 18,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#5AD27C',
        alignItems: 'center',
        justifyContent: 'center',
      }, props.style]}>
        {
          props.selected ?
            <View style={{
              height: 10,
              width: 10,
              borderRadius: 6,
              backgroundColor: '#5AD27C',
            }}/>
            : null
        }
      </View>
  );
}

export default RadioButton;