import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useTheme from '../hooks/useTheme';
import useThemedStyles from '../hooks/useThemedStyles';

const IssueTypeView = ({issueType, size = 'small'}) => {
  const style = useThemedStyles(styles);
  const theme = useTheme();
  const moreContainerStyles = {
    backgroundColor: issueType.color,
    width: size === 'small' ? 80 : 140,
    paddingVertical: size === 'small' ? 0 : 7,
    marginBottom: size === 'small' ? 0 : 5,
  };

  const moreTextStyles = {
    fontSize:
      size === 'small' ? theme.typography.size.XS3 : theme.typography.size.S,
  };
  const containerStyles = StyleSheet.compose(
    style.container,
    moreContainerStyles,
  );

  const textStyles = StyleSheet.compose(style.text, moreTextStyles);
  return (
    <View style={containerStyles}>
      <Text style={textStyles}>{issueType.name}</Text>
    </View>
  );
};

export default IssueTypeView;

const styles = theme =>
  StyleSheet.create({
    container: {
      paddingVertical: 2,
      marginRight: 5,
      borderRadius: 10,
      overflow: 'visible',
    },
    text: {
      color: 'black',
      fontSize: theme.typography.size.XS3,
      textAlign: 'center',
      fontFamily: 'Lora-Bold',
    },
  });
