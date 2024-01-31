'use client';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useBoundStore } from '../store/useStore';
import { useEffect, useState } from 'react';

export default function CastStorage() {
  const { saveCast, loadCast, removeCast, resetSim } = useBoundStore(
    (state) => state
  );
  const [castKeys, setCastKeys] = useState(new Array<string>());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');

  useEffect(() => {
    setCastKeys(
      Object.keys(localStorage).filter((key) => key.startsWith('dsc_'))
    );
  }, []);

  const handleOpen = () => {
    setName('');
    onOpen();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const handleSaveCast = () => {
    if (name === '') return;
    const newKey = `dsc_${name}`;
    saveCast(newKey);
    setCastKeys([...castKeys, newKey]);
    onClose();
  };

  const handleLoadCast = (key: string) => {
    loadCast(key);
    resetSim();
  };

  const handleRemoveCast = (key: string) => {
    removeCast(key);
    setCastKeys(castKeys.filter((castKey) => castKey !== key));
  };

  return (
    <Box
      width="100%"
      maxWidth="500px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text>Saved Casts</Text>
      {castKeys.length > 0 ? (
        castKeys.map((key, i) => (
          <Flex key={i}>
            <Text>{key.substring(4, key.length)}</Text>
            <Spacer />
            <Button onClick={() => handleLoadCast(key)}>Load Cast</Button>
            <Button onClick={() => handleRemoveCast(key)}>Remove Cast</Button>
          </Flex>
        ))
      ) : (
        <Text>No Saved Casts yet!</Text>
      )}
      <Button onClick={handleOpen}>Save Cast</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save Cast</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Custom Cast Name</FormLabel>
              <Input placeholder="season32" onChange={handleNameChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleSaveCast}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
