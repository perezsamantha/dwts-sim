import {
  Box,
  Button,
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { useBoundStore } from '../store/useStore';
import { useState } from 'react';
import prosData from '../data/pros.json';
import celebsData from '../data/celebs.json';
import { sortPros, sortCelebs, createDancerObj } from '../lib/logic';
import {
  Select as ChakraSelect,
  createFilter,
  components,
} from 'chakra-react-select';

function CustomOption(props: any) {
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  return <components.Option {...newProps}>{props.children}</components.Option>;
}

export default function EditModal(props: { teamId: number; dancerId: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateDancer, resetSim } = useBoundStore((state) => state);
  const dancer = useBoundStore(
    (state) => state.cast[props.teamId].teamMembers[props.dancerId]
  );
  const [custom, setCustom] = useState(dancer);
  const [celebIndex, setCelebIndex] = useState(0);
  const [proIndex, setProIndex] = useState(0);
  const [tab, setTab] = useState(0);
  const pros = sortPros(prosData);
  const celebs = sortCelebs(celebsData);

  const celebOptions = celebs.map((celeb, i) => ({
    label: `${celeb.firstName} ${celeb.lastName} - Season ${celeb.season}`,
    value: i,
  }));

  const proOptions = pros.map((pro, i) => ({
    label: `${pro.firstName} ${pro.lastName}`,
    value: i,
  }));

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
      if (tab === 0)
        updateDancer(props.teamId, props.dancerId, {
          ...custom,
          type: 'custom',
          dataIndex: 0,
        });
      else if (tab == 1)
        updateDancer(
          props.teamId,
          props.dancerId,
          createDancerObj(celebIndex, 'celeb')
        );
      else if (tab === 2)
        updateDancer(
          props.teamId,
          props.dancerId,
          createDancerObj(proIndex, 'pro')
        );
      resetSim();
      onClose();
    }
  };

  const handleModalOpen = () => {
    if (dancer.type == 'custom') {
      setCustom(dancer);
      setTab(0);
    } else {
      if (dancer.type == 'celeb') {
        const idx = dancer.dataIndex;
        setCelebIndex(idx);
        setCustom({
          ...custom,
          firstName: celebs[idx].firstName,
          lastName: celebs[idx].lastName,
          image: '',
        });
        setTab(1);
      } else {
        const idx = dancer.dataIndex;
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

  const isError = !custom.firstName || !custom.firstName.trim();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Button onClick={() => handleModalOpen()}>edit</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Edit Team {props.teamId + 1}{' '}
            {props.dancerId === 1 ? 'Celebrity' : 'Professional'}
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
                  <ChakraSelect
                    filterOption={createFilter({ ignoreAccents: false })}
                    components={{ Option: CustomOption }}
                    useBasicStyles
                    name="celebs"
                    //selectedOptionStyle="check"
                    closeMenuOnSelect
                    value={celebOptions.find(
                      (option) => option.value === celebIndex
                    )}
                    options={celebOptions}
                    onChange={(event) => setCelebIndex(event?.value!)}
                  />
                </TabPanel>
                <TabPanel>
                  <ChakraSelect
                    filterOption={createFilter({ ignoreAccents: false })}
                    components={{ Option: CustomOption }}
                    useBasicStyles
                    name="pros"
                    //selectedOptionStyle="check"
                    closeMenuOnSelect
                    value={proOptions.find(
                      (option) => option.value === proIndex
                    )}
                    options={proOptions}
                    onChange={(event) => setProIndex(event?.value!)}
                  />
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
