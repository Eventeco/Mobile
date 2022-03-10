import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';

const Button = ({
  title,
  styleForButton,
  styleForButtonContainer,
  onPress,
  disabled = false,
}) => {
  const themedStyle = useThemedStyles(styles);
  const btnContainerStyle = StyleSheet.compose(
    themedStyle.btnContainer,
    styleForButtonContainer,
  );
  const btnStyle = StyleSheet.compose(themedStyle.btn, styleForButton);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={btnContainerStyle}
      disabled={disabled}>
      <Text style={btnStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = theme =>
  StyleSheet.create({
    btnContainer: {
      width: '100%',
      borderRadius: 5,
      justifyContent: 'center',
      flexDirection: 'row',
      paddingVertical: 12,
    },
    btn: {
      fontSize: theme.typography.size.XS,
    },
  });
