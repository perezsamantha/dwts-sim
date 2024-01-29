'use client';
import { ArrowBackIcon, InfoIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  IconButton,
  Link,
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
import HomeButton from './homeButton';

export default function Header(props: {
  type: 'home' | 'setup' | 'week' | 'results' | 'summary';
  week: number;
}) {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  const handleRouter = () => {
    if (props.type === 'setup') router.push('/');
    else if (props.type === 'week') {
      if (props.week === 1) router.push('/setup');
      else router.push(`/week${props.week - 1}/results`);
    } else if (props.type === 'results') router.push(`/week${props.week}`);
    else if (props.type === 'summary')
      router.push(`/week${props.week}/results`);
  };

  return (
    <Flex width="100%">
      <Box>
        {pathname !== '/' && (
          <IconButton
            aria-label="Previous Page"
            icon={<ArrowBackIcon />}
            onClick={handleRouter}
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

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="outside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent margin={5}>
          <ModalHeader alignSelf="center">DWTS Sim Information</ModalHeader>
          <ModalCloseButton top={4} />
          <ModalBody>
            <Accordion allowToggle>
              <AccordionItem borderTop="none">
                <AccordionButton px={0} _hover={{ bg: 'transparent' }}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize="xl">Overview</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel px={0}>
                  <Text>
                    This is a non-profit fan-created simulator inspired by the
                    television show &#39;Dancing with the Stars&#39; in which
                    celebrities are paired with professional dancers and over
                    the course of several weeks compete for judges&#39; points
                    and audience votes to crown a winner. Users can customize
                    their own cast and simulate a season of DWTS.
                  </Text>
                  <Text>
                    Link to spotify playlist containing every song in the song
                    bank can be found{' '}
                    <Link
                      href="https://open.spotify.com/playlist/7uYftq6IC0p2GJ5SSfDQQf?si=bd6c99fbc1ed401e"
                      isExternal
                      color="blue.300"
                    >
                      here
                    </Link>
                    .
                  </Text>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton px={0} _hover={{ bg: 'transparent' }}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize="xl">Privacy Policy</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel px={0}>
                  <Text>
                    This simulator does not use cookies or collect your personal
                    data. The only data collected is saved simulations in the
                    browser&#39;s local storage.
                  </Text>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem borderBottom="none">
                <AccordionButton px={0} _hover={{ bg: 'transparent' }}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize="xl">Credits</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel px={0}>
                  <Text>
                    This sim was created from scratch by ___ using Next.js,
                    Chakra UI, Tailwind CSS, and Zustand for state management.
                    The code repository can be viewed here:
                  </Text>
                  <Text>
                    All rights surrounding simulator concepts and preset images
                    belong to ABC Network, BBC Global, and Disney Plus. No
                    copyright was intended.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            {pathname !== '/' && (
              <Center my={3}>
                <HomeButton />
              </Center>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
