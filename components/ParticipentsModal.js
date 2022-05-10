import React, {useState, useEffect} from 'react';
import {Modal, VStack, HStack, Text, Button, Image} from 'native-base';
import EmptyImage from '../public/images/empty-profile-image.png';
import {BASE_URL} from '../constants';
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
            {participants.map(item => (
              <VStack>
                <HStack
                  key={item.id}
                  alignItems="center"
                  justifyContent="space-between">
                  <VStack>
                    {item.profilepicpath ? (
                      <Image
                        alt="User Image"
                        source={{
                          uri: `${BASE_URL}/s3/getImage/${item.profilepicpath}`,
                        }}
                        width={50}
                        borderRadius={50}
                        height={50}
                      />
                    ) : (
                      <Image
                        alt="User Image"
                        source={EmptyImage}
                        width={50}
                        borderRadius={50}
                        height={50}
                      />
                    )}
                  </VStack>
                  <VStack>
                    <Text fontWeight="medium">{item.firstname}</Text>
                    <Text color="blueGray.400" fontSize="xs">
                      {item.email}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
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
