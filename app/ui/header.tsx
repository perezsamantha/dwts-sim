'use client';
import { ArrowBackIcon, InfoIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex width="100%">
      <Box>
        <IconButton
          aria-label="Previous Page"
          icon={<ArrowBackIcon />}
          onClick={() => router.back()}
        />
      </Box>
      <Spacer />
      <Box>
        <IconButton
          aria-label="Toggle Color Mode"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        />
        <IconButton
          aria-label="Info Modal"
          onClick={onOpen}
          icon={<InfoIcon />}
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sim Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>info about the simulator</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
