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
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import CastImage from './castImage';
import { Team, useSimStore } from '../store/useStore';
import { useState } from 'react';
import prosData from '../data/pros.json';
import celebsData from '../data/celebs.json';
import { sortPros, sortCelebs } from '../lib/logic';

export default function Team(props: { data: Team }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = useState(0);
  const updateDancer = useSimStore((state) => state.updateDancer);
  const team = useSimStore((state) => state.cast[props.data.id - 1]);
  const [custom, setCustom] = useState(team.teamMembers[0]);
  const [celebIndex, setCelebIndex] = useState(0);
  const [proIndex, setProIndex] = useState(0);
  const [tab, setTab] = useState(0);
  const pros = sortPros(prosData);
  const celebs = sortCelebs(celebsData);

  const handleCustomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustom({
      ...custom,
      [event.target.id]: event.target.value,
      type: 'custom',
      dataIndex: 0,
    });
  };

  const saveChanges = () => {
    if (isError) return;
    if (updateDancer) {
      if (tab === 0) updateDancer(props.data.id - 1, type, custom);
      else if (tab == 1)
        updateDancer(props.data.id - 1, type, {
          firstName: celebs[celebIndex].firstName,
          lastName: celebs[celebIndex].lastName,
          image: celebs[celebIndex].image,
          type: 'celeb',
          dataIndex: celebIndex,
        });
      else if (tab === 2)
        updateDancer(props.data.id - 1, type, {
          firstName: pros[proIndex].firstName,
          lastName: pros[proIndex].lastName,
          image: pros[proIndex].image,
          type: 'pro',
          dataIndex: proIndex,
        });
      onClose();
    }
  };

  const handleModalOpen = (type: number) => {
    setType(type);
    if (team.teamMembers[type].type == 'custom') {
      setCustom(team.teamMembers[type]);
      setTab(0);
    } else {
      if (team.teamMembers[type].type == 'celeb') {
        const idx = team.teamMembers[type].dataIndex;
        setCelebIndex(idx);
        setCustom({
          ...custom,
          firstName: celebs[idx].firstName,
          lastName: celebs[idx].lastName,
          image: '',
        });
        setTab(1);
      } else {
        const idx = team.teamMembers[type].dataIndex;
        setProIndex(idx);
        setCustom({
          ...custom,
          firstName: pros[idx].firstName,
          lastName: pros[idx].lastName,
          image: '',
        });
        setTab(2);
      }
      // setCustom({
      //   ...custom,
      //   firstName: '',
      //   lastName: '',
      //   image: '',
      // });
    }
    onOpen();
  };

  const isError = custom.firstName === '';

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
            <Tabs
              variant="soft-rounded"
              colorScheme="gray"
              index={tab}
              onChange={(value: number) => setTab(value)}
            >
              <TabList>
                <Tab>Custom</Tab>
                <Tab>Celeb</Tab>
                <Tab>Pro</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <FormControl isInvalid={isError}>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      value={custom.firstName}
                      onChange={(event) => handleCustomChange(event)}
                      id="firstName"
                    />
                    {isError && (
                      <FormHelperText>First Name is required</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      value={custom.lastName}
                      onChange={(event) => handleCustomChange(event)}
                      id="lastName"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                      value={custom.image}
                      onChange={(event) => handleCustomChange(event)}
                      id="image"
                    />
                    {/* <FormHelperText>jpeg, png, or __ only</FormHelperText> */}
                  </FormControl>
                </TabPanel>
                <TabPanel>
                  <Select
                    value={celebIndex}
                    onChange={(event) =>
                      setCelebIndex(Number(event.target.value))
                    }
                  >
                    {celebs.map((celeb, i) => (
                      <option key={i} value={i}>
                        {celeb.firstName} {celeb.lastName} - Season{' '}
                        {celeb.season}
                      </option>
                    ))}
                  </Select>
                </TabPanel>
                <TabPanel>
                  <Select
                    value={proIndex}
                    onChange={(event) =>
                      setProIndex(Number(event.target.value))
                    }
                  >
                    {pros.map((pro, i) => (
                      <option key={i} value={i}>
                        {pro.firstName} {pro.lastName}
                      </option>
                    ))}
                  </Select>
                </TabPanel>
              </TabPanels>
            </Tabs>
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
