import React from 'react';
import {Modal, VStack, Text, Button} from 'native-base';

const TermsModal = ({showModal, setShowModal, ...props}) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      size="lg"
      {...props}>
      <Modal.Content maxWidth="400">
        <Modal.CloseButton />
        <Modal.Header>EventECO's Terms and Conditions</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <VStack>
              <Text fontWeight="medium">1. Intellectual Property rights</Text>
              <Text>
                This is to acknowledge that Codistrica retains all proprietary
                right, title and interest in the services, our name, or logo and
                any other intellectual property rights including, but not
                limited to modifications, enhancements and upgrades thereto. You
                agree that you will not use or register any trademark, business
                name, domain name or social media account name which
                incorporates in whole or in part EventEco or is similar in any
                form.
              </Text>
            </VStack>
            <VStack>
              <Text fontWeight="medium">2. Limitations of Use</Text>
              <Text>
                By using our application, you agree on behalf of yourself, not
                to modify, prepare derivative works of, or reverse engineer
                EventEco. You will not try to resell our services to any third
                party. You will not use our services in violation of any
                applicable laws or regulations.
              </Text>
            </VStack>
            <VStack>
              <Text fontWeight="medium">
                3. Responsibility regarding User Content
              </Text>
              <Text>
                Our service shall enable you to provide information which may
                have text, pictures, links or videos; all this content shall
                belong to you and we take no responsibility for and we do not
                expressly or implicitly endorse your content. By submitting your
                content to our services, you take full responsibility of the
                appropriateness of your content which may expose you to
                liability if you post any content without all necessary rights.
                {'\n'}
                Although we have no obligation to monitor and screen your
                content, we may in sole discretion, remove your content at any
                time and for any reason, which shall be specified and will be in
                coherence with our content policy, or if you otherwise create
                liability for us.
              </Text>
            </VStack>
            <VStack>
              <Text fontWeight="medium">4. Donations</Text>
              <Text>
                Our service includes the option of providing donations, but in
                no form is Codistrica responsible for the exchange of said
                donations. We take no responsibility in transferring your
                donations to respected parties and shall not be held accountable
                for any fraudulent activity. You agree that Codistrica, shall,
                in no event, be liable for any consequential, incidental,
                indirect or punitive loss or damage that may be incurred
                financially or physically, with regards to donations and events.
              </Text>
            </VStack>
            <VStack>
              <Text fontWeight="medium">5. Right to Terminate Accounts</Text>
              <Text>
                If you fail to comply with any of the provisions of this
                Agreement, Codistrica may, with notice to you, terminate this
                Agreement and/or your EventEco ID, and you will remain liable
                for all damage imposed. Termination will be proceeded with your
                account and event information be removed from EventEco
                permanently and will not be, in any case provided to you after
                termination.
              </Text>
            </VStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button
            flex="1"
            colorScheme="green"
            onPress={() => {
              setShowModal(false);
            }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default TermsModal;
