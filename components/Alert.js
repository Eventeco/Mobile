import React from 'react';
import {Image} from 'react-native';
import {AlertDialog} from 'native-base';

const Alert = ({onClose, isOpen, alertTitle, alertText, icon, children}) => {
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{alertTitle}</AlertDialog.Header>
        <AlertDialog.Body>
          {icon && <Image source={icon} />}
          {alertText}
          {children}
        </AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default Alert;
