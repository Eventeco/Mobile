import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';

const Button = ({
  title,
  styleForButton,
  styleForButtonContainer,
  onPress,
  isLoading = false,
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
      disabled={isLoading || disabled}>
      {!isLoading ? (
        <Text style={btnStyle}>{title}</Text>
      ) : (
        <ActivityIndicator size="large" color="white" />
      )}
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
