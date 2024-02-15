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

export default function Header(props: {
  type: 'home' | 'setup' | 'week' | 'results' | 'finaltwo' | 'summary';
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
    else if (props.type === 'finaltwo')
      router.push(`/week${props.week}/results`);
    else if (props.type === 'summary') router.push(`/finaltwo`);
  };

  const handleButton = () => {
    router.push(`/`);
  };

  return (
    <Flex width="100%">
      <Box>
        {pathname !== '/' && (
          <IconButton
            aria-label="Previous Page"
            icon={<ArrowBackIcon />}
            onClick={handleRouter}
            variant="ghost"
            fontSize="25px"
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
          variant="ghost"
          fontSize="20px"
        />
        <IconButton
          aria-label="Info Modal"
          onClick={onOpen}
          icon={<InfoIcon />}
          variant="ghost"
          fontSize="20px"
        />
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent margin={4}>
          <ModalHeader alignSelf="center">DWTS Sim Information</ModalHeader>
          <ModalCloseButton top={4} rounded="2xl" />
          <ModalBody>
            <Accordion allowToggle mb={2}>
              <AccordionItem borderTop="none">
                <AccordionButton px={0} _hover={{ bg: 'transparent' }}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize="xl">Overview</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel px={0}>
                  <Text mb={3}>
                    This is a non-profit fan-created simulator inspired by the
                    television show &#39;Dancing with the Stars&#39; in which
                    celebrities are paired with professional dancers and over
                    the course of several weeks compete for judges&#39; points
                    and audience votes to crown a winning team. Users can
                    customize their own cast and simulate a season of DWTS
                    through randomized songs, styles, and scores.
                  </Text>
                  <Text mb={3}>
                    Link to spotify playlist containing every song in the song
                    bank can be found{' '}
                    <Link
                      href="https://open.spotify.com/playlist/7uYftq6IC0p2GJ5SSfDQQf?si=bd6c99fbc1ed401e"
                      isExternal
                      color="teal.500"
                    >
                      here
                    </Link>
                    .
                  </Text>
                  <Text>
                    Link to google form for submitting song requests can be
                    found{' '}
                    <Link
                      href="https://forms.gle/vUC4rnQ6dU2AdUPK6"
                      isExternal
                      color="teal.500"
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
                  <Text mb={3}>
                    This simulator does not collect the user&#39;s personal data
                    or use any first-party cookies. Currently, the sim stores
                    saved casts in the browser&#39;s local storage and active
                    simulations in session storage.
                  </Text>
                  <Text mb={3}>
                    Spotify embeds are utilized as song previews for each dance.
                    If the user is logged into Spotify on the same browser as
                    the sim, the full song with additional functionality will be
                    available. Otherwise, the song will be a 30 second preview.
                    The sim does not have access to the user&#39;s Spotify
                    account and will not perform any actions on their behalf.
                  </Text>
                  <Text>
                    The sim uses Google Analytics to collect non-personal
                    general information provided by the user&#39;s browser to
                    report visitor insights. Users can view Google&#39;s Privacy
                    Policy{' '}
                    <Link
                      href="https://policies.google.com/privacy"
                      isExternal
                      color="teal.500"
                    >
                      here
                    </Link>{' '}
                    and opt out of tracking{' '}
                    <Link
                      href="https://tools.google.com/dlpage/gaoptout"
                      isExternal
                      color="teal.500"
                    >
                      here
                    </Link>
                    .
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
                  <Text mb={3}>
                    This sim was created from scratch using TypeScript, Next.js,
                    Chakra UI, Tailwind CSS, PostgreSQL, and Zustand for state
                    management. The GitHub code repository can be viewed{' '}
                    <Link
                      href="https://github.com/perezsamantha/dwts-sim"
                      isExternal
                      color="teal.500"
                    >
                      here
                    </Link>
                    .
                  </Text>
                  <Text>
                    All rights surrounding simulator concepts and preset images
                    belong to ABC Network, BBC Global, and Disney Plus. Original
                    simulator idea inspired by{' '}
                    <Link
                      href="https://brantsteele.com/"
                      isExternal
                      color="teal.500"
                    >
                      BrantSteele
                    </Link>
                    . No copyright was intended.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            {pathname !== '/' && (
              <Center>
                <Button mt={0} mb={3} onClick={handleButton}>
                  Home
                </Button>
              </Center>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
