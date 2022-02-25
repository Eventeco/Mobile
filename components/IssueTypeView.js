import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {issueTypeColors} from '../constants';
import useTheme from '../hooks/useTheme';
import useThemedStyles from '../hooks/useThemedStyles';

const IssueTypeView = ({issueType, size = 'small'}) => {
  const style = useThemedStyles(styles);
  const color = issueTypeColors[issueType.toLowerCase()];
  const theme = useTheme();
  const moreContainerStyles = {
    backgroundColor: color,
    width: size === 'small' ? 80 : 140,
    paddingVertical: size === 'small' ? 0 : 7,
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
      <Text style={textStyles}>{issueType}</Text>
    </View>
  );
};

export default IssueTypeView;

const styles = theme =>
  StyleSheet.create({
    container: {
      paddingVertical: 2,
      marginRight: 5,
      borderRadius: 50,
    },
    text: {
      color: 'black',
      fontWeight: '700',
      textAlign: 'center',
    },
  });
