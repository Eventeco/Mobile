import React, {useState, useEffect} from 'react';
import {
  Modal,
  VStack,
  HStack,
  Text,
  Button,
  TextArea,
  Box,
  Heading,
  Avatar,
  Spacer,
} from 'native-base';
import {AirbnbRating} from 'react-native-ratings';
import {BASE_URL} from '../constants';
import axios from '../axios';
import {useStateValue} from '../StateProvider/StateProvider';

const FeedbackModal = ({event, showModal, setShowModal, ...props}) => {
  const [review, setReview] = useState();
  const [reason, setReason] = useState('');
  const [eventFeedback, setEventFeedback] = useState(null);
  const [feedbackCheck, setFeedbackCheck] = useState(false);
  const [{user: loggedInUser}] = useStateValue();

  useEffect(() => {
    if (event) {
      const fetchEventFeedback = async () => {
        try {
          const res = await axios.get(`/eventFeedbacks/${event.id}`);
          const feedbacks = res.data.data;
          setEventFeedback(feedbacks);
          feedbacks.forEach(feedback => {
            if (feedback.user.id === loggedInUser.id) {
              setFeedbackCheck(true);
            }
          });
        } catch (e) {
          console.log(e);
        }
      };
      fetchEventFeedback();
    }
  }, [event, loggedInUser.id]);

  const postFeedback = async () => {
    try {
      await axios.post('/eventFeedbacks', {
        eventId: event.id,
        rating: review,
        comments: reason,
      });
      setShowModal(false);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      size="lg"
      {...props}>
      <Modal.Content maxWidth="400">
        <Modal.CloseButton />
        <Modal.Header>
          <Text fontSize="md" fontWeight="medium">
            Event Feedback: {event.name}
          </Text>
        </Modal.Header>
        <Modal.Body>
          {feedbackCheck ? (
            <Box>
              <Heading fontSize="md" p="1" pb="2">
                Reviews
              </Heading>
              {eventFeedback &&
                eventFeedback.map((item, i) => (
                  <Box
                    borderBottomWidth="1"
                    _dark={{
                      borderColor: 'gray.600',
                    }}
                    borderColor="coolGray.200"
                    pl="4"
                    pr="5"
                    py="2"
                    key={i}>
                    <HStack space={3} justifyContent="space-between">
                      <Avatar
                        size="36px"
                        source={{
                          uri: `${BASE_URL}/s3/getImage/${item.user.profilepicpath}`,
                        }}
                      />
                      <VStack>
                        <Text
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          color="coolGray.800"
                          bold>
                          {item.user.firstname}
                        </Text>
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: 'warmGray.200',
                          }}>
                          {item.comments}
                        </Text>
                      </VStack>
                      <Spacer />
                      <AirbnbRating
                        size={12}
                        isDisabled={true}
                        defaultRating={item.rating}
                        selectedColor="#5AD27C"
                        showRating={false}
                      />
                    </HStack>
                  </Box>
                ))}
            </Box>
          ) : (
            <VStack space={3}>
              <AirbnbRating
                onFinishRating={rating => setReview(rating)}
                size={20}
                defaultRating={0}
                showRating={false}
                selectedColor="#5AD27C"
              />
              <TextArea
                value={reason}
                onChangeText={setReason}
                placeholder={'Write a comment for this event'}
              />
            </VStack>
          )}
        </Modal.Body>
        <Modal.Footer>
          {feedbackCheck ? (
            <Button
              flex="1"
              colorScheme="green"
              onPress={() => {
                setShowModal(false);
              }}>
              Close
            </Button>
          ) : (
            <Button
              flex="1"
              colorScheme="green"
              onPress={() => {
                postFeedback();
              }}>
              Submit Review
            </Button>
          )}
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default FeedbackModal;
