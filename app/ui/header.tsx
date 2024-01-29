'use client';
import { ArrowBackIcon, InfoIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Divider,
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
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  return (
    <Flex width="100%">
      <Box>
        {pathname !== '/' && (
          <IconButton
            aria-label="Previous Page"
            icon={<ArrowBackIcon />}
            onClick={() => router.back()}
          />
        )}
      </Box>
      <Spacer />
      <Box>
        <IconButton
          aria-label="Toggle Color Mode"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          marginRight={1}
        />
        <IconButton
          aria-label="Info Modal"
          onClick={onOpen}
          icon={<InfoIcon />}
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent margin={5}>
          <ModalHeader>DWTS Sim Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="xl">Overview</Text>
            <Divider />
            <Text>
              This is a non-profit fan-created simulator inspired by the
              television show &#39;Dancing with the Stars&#39; in which
              celebrities are paired with professional dancers and over the
              course of several weeks compete for judges&#39; points and
              audience votes to crown a winner. Users can customize their own
              cast and simulate a season of DWTS.
            </Text>
            <Text>
              Link to spotify playlist containing every song in the song bank
            </Text>
            <Text fontSize="xl">Privacy Policy</Text>
            <Divider />
            <Text>
              This simulator does not use cookies or collect your personal data.
              The only data collected is saved simulations in the browser&#39;s
              local storage.
            </Text>
            <Text fontSize="xl">Credits</Text>
            <Divider />
            <Text>
              This sim was created from scratch by ___ using Next.js, Chakra UI,
              Tailwind CSS, and Zustand for state management. The code
              repository can be viewed here:
            </Text>
            <Text>
              All rights surrounding simulator concepts and preset images belong
              to ABC Network, BBC Global, and Disney Plus. No copyright was
              intended.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
