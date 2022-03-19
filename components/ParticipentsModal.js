import React, { useState, useEffect} from 'react'
import { Modal, VStack, HStack, Text, Button } from 'native-base';
import axios from '../axios';


const ParticipentsModal = ({ eventId, showModal, setShowModal, ...props }) => {

  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    const fetchParticipants = async () => {
      console.log(eventId)
      try {
        const res = await axios.get(`/eventParticipants/${eventId}`);
        setParticipants(res.data.data);
        console.log(res.data.data)
      } catch (e) {
        console.log(e)
      }
    };

    fetchParticipants();
  }, []);


  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg" {...props}>
      <Modal.Content maxWidth="400">
        <Modal.CloseButton />
        <Modal.Header>List of Participents</Modal.Header>
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
          <Button flex="1" colorScheme="green" onPress={() => {
          setShowModal(false);
        }}>
            Close List
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default ParticipentsModal

