import React, {useState, useEffect} from 'react';
import {Modal, VStack, HStack, Text, Button} from 'native-base';
import axios from '../axios';

const ParticipentsModal = ({eventId, showModal, setShowModal, ...props}) => {
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await axios.get(`/eventParticipants/${eventId}`);
        setParticipants(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchParticipants();
  }, [eventId]);

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      size="lg"
      {...props}>
      <Modal.Content maxWidth="400">
        <Modal.CloseButton />
        <Modal.Header>List of Participants</Modal.Header>
        <Text textAlign="center" fontWeight="medium" marginTop={2}>
          Total: {participants.length}
        </Text>
        <Modal.Body>
          <VStack space={3}>
            {participants.map((item) => (
              <HStack key={item.userid} alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">{item.firstname + ' ' + item.lastname}</Text>
                <Text color="blueGray.400">{item.email}</Text>
              </HStack>
            ))}
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button
            flex="1"
            colorScheme="green"
            onPress={() => {
              setShowModal(false);
            }}>
            Close List
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ParticipentsModal;
