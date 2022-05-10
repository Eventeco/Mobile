import React, {useState, useEffect} from 'react';
import {Modal, VStack, HStack, Text, Button, Image, TextArea} from 'native-base';
import EmptyImage from '../public/images/empty-profile-image.png';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { BASE_URL } from '../constants';
import axios from '../axios';

const ReviewModal = ({user, showModal, setShowModal, ...props}) => {
  
  const [review, setReview] = useState()
  const [reason, setReason] = useState("")
  const [userRating, setUserRating] = useState(null)

  useEffect(() => {
    if (user) {
      const fetchUserRating = async () => {
        try {
          const res = await axios.get(`/userRatings/${user.id}`);
          setUserRating(res);
          console.log(res.data.data)
        } catch (e) {
          console.log(e);
        }
      };
      fetchUserRating();
    }
  }, [user]);

  const postRating = async () => {
    try {
      const res = await axios.post(`/userRatings`, {
        ratedUserId: user.id,
        rating: review,
        reason: reason
      });
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      size="lg"
      {...props}>
      <Modal.Content maxWidth="400">
        <Modal.CloseButton />
        <Modal.Header>
          <Text fontSize="md" fontWeight="medium">User Review: {user?.firstname + " " + user?.lastname}</Text>
        </Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <AirbnbRating onFinishRating={(rating) => setReview(rating)} size={20} defaultRating={0} showRating={false} selectedColor="#5AD27C" />
            <TextArea value={reason} onChangeText={setReason} placeholder={"Write a reason for your review"} />
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button
            flex="1"
            colorScheme="green"
            onPress={() => {
              postRating()
            }}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ReviewModal;
