import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import useTheme from '../hooks/useTheme';
import useThemedStyles from '../hooks/useThemedStyles';

const Input = ({styleForInput, placeholder, value, setValue, ...others}) => {
  const theme = useTheme();
  const themedStyle = useThemedStyles(styles);
  const inputStyle = StyleSheet.compose(themedStyle.input, styleForInput);

  return (
    <TextInput
      style={inputStyle}
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      placeholderTextColor={theme.colors.GRAY_100}
      {...others}
    />
  );
};

export default Input;

const styles = theme =>
  StyleSheet.create({
    input: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.GRAY_100,
      width: '100%',
      color: '#000',
      fontSize: theme.typography.size.S,
    },
  });
