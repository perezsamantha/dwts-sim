'use client';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
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
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useBoundStore } from '../store/useStore';
import { useEffect, useState } from 'react';
import Loading from './loading';

export default function CastStorage() {
  const { saveCast, loadCast, removeCast, resetSim } = useBoundStore(
    (state) => state
  );
  const [castKeys, setCastKeys] = useState(new Array<string>());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCastKeys(
      Object.keys(localStorage).filter((key) => key.startsWith('dsc_'))
    );
    setLoading(false);
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

  return loading ? (
    <Spinner size="lg" margin={4} />
  ) : (
    <Box
      width="100%"
      maxWidth="500px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      //border="1px solid rgba(0, 0, 0, 0.269)"
      p={2}
      borderRadius="xl"
      my={2}
    >
      <Box>
        <Text fontSize="lg">Saved Casts</Text>
        {/* <Divider borderColor="gray" /> */}
      </Box>
      {castKeys.length > 0 ? (
        castKeys.map((key, i) => (
          <Flex key={i} width="100%" alignItems="center">
            <Box maxWidth="55%">
              <Text noOfLines={1}>{key.substring(4, key.length)}</Text>
            </Box>
            <Spacer />
            <ButtonGroup maxWidth="40%">
              <Button variant="ghost" onClick={() => handleLoadCast(key)}>
                Load
              </Button>
              <Button variant="ghost" onClick={() => handleRemoveCast(key)}>
                Remove
              </Button>
            </ButtonGroup>
          </Flex>
        ))
      ) : (
        <Text>No Saved Casts yet!</Text>
      )}
      <Button onClick={handleOpen}>Save Cast</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xs"
        isCentered
        autoFocus={false}
      >
        <ModalOverlay />
        <ModalContent margin={4}>
          <ModalHeader>Save Cast</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Custom Cast Name</FormLabel>
              <Input placeholder="season32" onChange={handleNameChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSaveCast}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
