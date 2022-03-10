import React from 'react';
import {View, StyleSheet} from 'react-native';

function RadioButton(props) {
  const containerStyles = StyleSheet.compose(styles.container, props.style);
  return (
    <View style={containerStyles}>
      {props.selected ? <View style={styles.innerContainer} /> : null}
    </View>
  );
}

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    height: 18,
    width: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#5AD27C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    height: 10,
    width: 10,
    borderRadius: 6,
    backgroundColor: '#5AD27C',
  },
});
