import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { useBoundStore } from '../store/useStore';
import { useState } from 'react';

export default function EditJudgesModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const judges = useBoundStore((state) => state.judges);
  const updateJudges = useBoundStore((state) => state.updateJudges);
  const [custom, setCustom] = useState(judges);

  const handleCustomChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustom(
      custom.map((judge, i) => (i === id ? event.target.value : judge))
    );
  };

  const saveChanges = () => {
    if (isError(0) || isError(1) || isError(2)) return;

    if (updateJudges) {
      updateJudges(custom);
      onClose();
    }
  };

  const handleModalOpen = () => onOpen();

  const isError = (id: number) => !custom[id] || !custom[id].trim();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Button onClick={() => handleModalOpen()}>edit</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Judges</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {custom.map((judge, i) => (
              <FormControl key={i} isInvalid={isError(i)}>
                <FormLabel>Judge {i + 1}</FormLabel>
                <Input
                  value={custom[i]}
                  onChange={(event) => handleCustomChange(i, event)}
                />
                {isError(i) && (
                  <FormHelperText>Judge {i + 1} is required</FormHelperText>
                )}
              </FormControl>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={saveChanges}>
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
