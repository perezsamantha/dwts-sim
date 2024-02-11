import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useBoundStore } from '../store/useStore';
import { useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';

export default function EditJudgesModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { judges, updateJudges, resetSim } = useBoundStore((state) => state);
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
      resetSim();
      onClose();
    }
  };

  const handleModalOpen = () => onOpen();

  const isError = (id: number) => !custom[id] || !custom[id].trim();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <IconButton
        aria-label="edit"
        icon={<EditIcon />}
        onClick={() => handleModalOpen()}
        variant="ghost"
        fontSize="20px"
        mt={0}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent margin={4}>
          <ModalHeader>Edit Judges</ModalHeader>
          <ModalBody>
            {custom.map((_, i) => (
              <FormControl key={i} isInvalid={isError(i)}>
                <FormLabel my={2}>Judge {i + 1}</FormLabel>
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
            <Button colorScheme="teal" mr={3} onClick={saveChanges}>
              Save
            </Button>

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
