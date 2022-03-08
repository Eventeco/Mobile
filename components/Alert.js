import React from 'react'
import { StyleSheet } from 'react-native'
import { AlertDialog, Button } from 'native-base';
import useThemedStyles from '../hooks/useThemedStyles';

const Alert = ({ onClose, isOpen, alertTitle, alertText, icon }) => {

  const style = useThemedStyles(styles);
  const cancelRef = React.useRef(null);

  console.log('this was called')
  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{alertTitle}</AlertDialog.Header>
        <AlertDialog.Body>
          {icon && <Image source={icon}></Image>}{alertText}
        </AlertDialog.Body>
        <AlertDialog.Footer>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}

export default Alert;

const styles = theme => StyleSheet.create({
  fieldStyles: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'black',
    width: '100%'
  }
});
