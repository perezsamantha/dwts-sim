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
    newMembers[type] = {
      ...newMembers[type],
      [event.target.id]: event.target.value,
    };
    setTeamCopy({
      ...teamCopy,
      teamMembers: newMembers,
    });
  };

  const saveChanges = () => {
    if (isError) return;
    if (updateTeam) {
      updateTeam(props.data.id, teamCopy);
      onClose();
    }
  };

  const handleModalOpen = (type: number) => {
    setType(type);
    onOpen();
  };

  const isError = teamCopy.teamMembers[type].firstName === '';

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
          <CastImage data={team.teamMembers[0]} />
          <Text align="center">
            {team.teamMembers[0].firstName} {team.teamMembers[0].lastName}
          </Text>
          <Button onClick={() => handleModalOpen(0)}>edit</Button>
        </Box>
        <Spacer />
        <Box width={'48%'}>
          <CastImage data={team.teamMembers[1]} />
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
            Edit Team {team.id} {type === 1 ? 'Celebrity' : 'Professional'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={isError}>
              <FormLabel>First Name</FormLabel>
              <Input
                isRequired
                value={teamCopy.teamMembers[type].firstName}
                onChange={(event) => handleChange(event)}
                id="firstName"
              />
              {isError && (
                <FormHelperText>First Name is required</FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={teamCopy.teamMembers[type].lastName}
                onChange={(event) => handleChange(event)}
                id="lastName"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image URL</FormLabel>
              <Input
                value={teamCopy.teamMembers[type].image}
                onChange={(event) => handleChange(event)}
                id="image"
              />
              {/* <FormHelperText>jpeg, png, or __ only</FormHelperText> */}
            </FormControl>
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
