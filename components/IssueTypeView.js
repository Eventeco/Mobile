import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {issueTypeColors} from '../constants';
import useThemedStyles from '../hooks/useThemedStyles';

const IssueTypeView = ({issueType}) => {
  const style = useThemedStyles(styles);
  const color = issueTypeColors[issueType.toLowerCase()];
  const containerStyles = StyleSheet.compose(style.container, {
    backgroundColor: color,
  });
  return (
    <View style={containerStyles}>
      <Text style={style.text}>{issueType}</Text>
    </View>
  );
};

export default IssueTypeView;

const styles = theme =>
  StyleSheet.create({
    container: {
      paddingVertical: 2,
      width: 80,
      marginRight: 5,
      borderRadius: 50,
    },
    text: {
      color: 'black',
      fontSize: theme.typography.size.XS3,
      textAlign: 'center',
      fontFamily: 'Lora-Bold',
    },
  });
