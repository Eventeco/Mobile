import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';

const TextInputField = props => {
  const style = useThemedStyles(styles);

  return <TextInput style={style.fieldStyles} {...props} />;
};

export default TextInputField;

const styles = () =>
  StyleSheet.create({
    fieldStyles: {
      borderWidth: 1,
      borderRadius: 6,
      width: '100%',
    },
  });
