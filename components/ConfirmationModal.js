import React from 'react';
import {View} from 'native-base';
import {Button, Modal, Text} from 'native-base';

const ConfirmationModal = ({showModal, setShowModal, actionOnConfirm}) => {
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          <Text color="green.500" fontWeight="bold" fontSize="md">
            Confirmation
          </Text>
        </Modal.Header>
        <Modal.Body>
          <View>
            <Text textAlign="center" fontWeight="bold" mb="3" fontSize="md">
              Are you sure you want to delete this event?
            </Text>
            <Text textAlign="center" color="red.600">
              Once you delete an event it will not be possible to undo it.
            </Text>
          </View>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              colorScheme="red"
              onPress={() => {
                setShowModal(false);
              }}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onPress={() => {
                actionOnConfirm();
                setShowModal(false);
              }}>
              Delete Event
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmationModal;
