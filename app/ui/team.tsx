import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import CastImage from './castImage';

export default function Team(props: { id: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      maxWidth="200px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text>Team {props.id}</Text>
      <Flex>
        <Box width={'48%'}>
          <CastImage />
          <Text align="center">Ariana Grande</Text>
        </Box>
        <Spacer />
        <Box width={'48%'}>
          <CastImage />
          <Text align="center">Ariana Grande</Text>
        </Box>
      </Flex>
      <Button onClick={onOpen}>edit</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Team {props.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Testing</ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Save
            </Button>

            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
