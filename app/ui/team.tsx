import {
  Box,
  Button,
  Flex,
  Input,
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
import { Team, useSimStore } from '../store/useStore';
import { useState } from 'react';

export default function Team(props: { data: Team }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = useState(0);
  const updateTeam = useSimStore((state) => state.updateTeam);
  const team = useSimStore((state) => state.cast[props.data.id - 1]);
  const [teamCopy, setTeamCopy] = useState(team);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newMembers = [...teamCopy.teamMembers];
    newMembers[type] = { ...newMembers[type], firstName: event.target.value };
    setTeamCopy({
      ...teamCopy,
      teamMembers: newMembers,
    });
  };

  const saveChanges = () => {
    if (updateTeam) {
      updateTeam(props.data.id, teamCopy);
      onClose();
    }
  };

  const handleModalOpen = (type: number) => {
    setType(type);
    onOpen();
  };

  return (
    <Box
      maxWidth="200px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text>Team {props.data.id}</Text>
      <Flex>
        <Box width={'48%'}>
          <CastImage url={team.teamMembers[0].image} />
          <Text align="center">
            {team.teamMembers[0].firstName} {team.teamMembers[0].lastName}
          </Text>
          <Button onClick={() => handleModalOpen(0)}>edit</Button>
        </Box>
        <Spacer />
        <Box width={'48%'}>
          <CastImage url={team.teamMembers[1].image} />
          <Text align="center">
            {team.teamMembers[1].firstName} {team.teamMembers[1].lastName}
          </Text>{' '}
          <Button onClick={() => handleModalOpen(1)}>edit</Button>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Edit Team {team.id} - Dancer {type}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Testing
            <Input
              value={teamCopy.teamMembers[type].firstName}
              onChange={(event) => handleChange(event)}
            />
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
