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
import { createDancerObj } from '../lib/logic';
import {
  Select as ChakraSelect,
  createFilter,
  components,
} from 'chakra-react-select';
import { EditIcon } from '@chakra-ui/icons';

function CustomOption(props: any) {
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  return <components.Option {...newProps}>{props.children}</components.Option>;
}

export default function EditModal(props: { teamId: number; dancerId: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateDancer, resetSim, pros, celebs } = useBoundStore(
    (state) => state
  );
  const dancer = useBoundStore(
    (state) => state.cast[props.teamId].teamMembers[props.dancerId]
  );
  const [custom, setCustom] = useState(dancer);
  const [celebIndex, setCelebIndex] = useState(0);
  const [proIndex, setProIndex] = useState(0);
  const [tab, setTab] = useState(0);

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#388aaf'
        : state.isFocused
          ? '#53bced5b'
          : 'inherit',
    }),
  };

  const celebOptions = celebs.map((celeb, i) => ({
    label: `${celeb.firstname} ${celeb?.lastname || ''} - Season ${
      celeb.season
    }`,
    value: i,
  }));

  const proOptions = pros.map((pro, i) => ({
    label: `${pro.firstname} ${pro.lastname || ''}`,
    value: i,
  }));

  const handleCustomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustom({
      ...custom,
      [event.target.id]: event.target.value,
      type: 'custom',
      dataId: '',
    });
  };

  const saveChanges = async () => {
    if (isError) return;
    if (updateDancer) {
      if (tab === 0)
        updateDancer(props.teamId, props.dancerId, {
          ...custom,
          type: 'custom',
          dataId: '',
        });
      else if (tab == 1)
        updateDancer(
          props.teamId,
          props.dancerId,
          createDancerObj(celebIndex, 'celeb', pros, celebs)
        );
      else if (tab === 2)
        updateDancer(
          props.teamId,
          props.dancerId,
          createDancerObj(proIndex, 'pro', pros, celebs)
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
        const idx = celebs.findIndex((celeb) => celeb.id === dancer.dataId);
        setCelebIndex(idx);
        setCustom({
          ...custom,
          firstname: celebs[idx].firstname,
          lastname: celebs[idx].lastname || '',
          image: '',
        });
        setTab(1);
      } else {
        const idx = pros.findIndex((pro) => pro.id === dancer.dataId);
        setProIndex(idx);
        setCustom({
          ...custom,
          firstname: pros[idx].firstname,
          lastname: pros[idx].lastname || '',
          image: '',
        });
        setTab(2);
      }
      // setCustom({
      //   ...custom,
      //   firstname: '',
      //   lastname: '',
      //   image: '',
      // });
    }
    onOpen();
  };

  const isError = !custom.firstname || !custom.firstname.trim();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <IconButton
        aria-label="edit"
        icon={<EditIcon />}
        onClick={() => handleModalOpen()}
        variant="ghost"
        fontSize="20px"
        m={0}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent margin={4}>
          <ModalHeader>
            Edit Team {props.teamId + 1}{' '}
            {props.dancerId === 1 ? 'Celebrity' : 'Professional'}
          </ModalHeader>
          <ModalCloseButton top={4} rounded="2xl" />
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
                    <FormLabel my={2}>First Name</FormLabel>
                    <Input
                      value={custom.firstname}
                      onChange={(event) => handleCustomChange(event)}
                      id="firstname"
                    />
                    {isError && (
                      <FormHelperText>First Name is required</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel my={2}>Last Name</FormLabel>
                    <Input
                      value={custom.lastname || ''}
                      onChange={(event) => handleCustomChange(event)}
                      id="lastname"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel my={2}>Image URL</FormLabel>
                    <Input
                      value={custom.image}
                      onChange={(event) => handleCustomChange(event)}
                      id="image"
                    />
                    {/* <FormHelperText>.jpeg, .png, or .webp only</FormHelperText> */}
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
                    styles={customStyles}
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
                    styles={customStyles}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
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
