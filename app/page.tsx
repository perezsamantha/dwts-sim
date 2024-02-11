'use client';
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Heading,
  Link,
  Tag,
  TagLabel,
  Text,
  Wrap,
  useColorMode,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Header from './ui/header';
import { sortStyles } from './lib/logic';
import {
  ChevronRightIcon,
  InfoIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import { default as NextImage } from 'next/image';

export default function Home() {
  const router = useRouter();
  const styles = sortStyles();
  const { colorMode } = useColorMode();

  const lightModeShadow = '0 0 50px -25px rgba(0, 0, 0, 0.15)';
  const darkModeShadow =
    'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 0px 10px,rgba(0, 0, 0, 0.5) 0px 0 50px -15px';

  const imageStyle = {
    borderRadius: 10,
    boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.15)',
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={4}
      textAlign="center"
      gap={2}
    >
      <Header type="home" week={0} />
      <Heading as="h1" size="xl">
        DWTS Simulator
      </Heading>
      <Text>Welcome to the Dancing with the Stars Simulator!</Text>
      <Box
        maxW="xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
        rounded="lg"
        my={2}
        p={3}
        boxShadow={colorMode === 'dark' ? darkModeShadow : lightModeShadow}
        bg={colorMode === 'dark' ? 'blackalpha.50' : 'whitealpha.50'}
        gap={3}
        textAlign="left"
      >
        <Heading as="h4" size="md">
          Tips
        </Heading>
        <HStack width="100%">
          <ChevronRightIcon />
          <Text>
            Customize your own cast by choosing from current/former professional
            dancers and celebrities or by customizing your own team.
          </Text>
        </HStack>
        <HStack width="100%">
          <ChevronRightIcon />
          <Text>
            Custom casts can be saved before, during, or after a simulation is
            completed by returning to <Text as="em">Setup</Text> page.
          </Text>
        </HStack>
        <HStack width="100%">
          <ChevronRightIcon />
          <Text>
            Click{' '}
            {colorMode === 'dark' ? <SunIcon mb={1} /> : <MoonIcon mb={1} />} to
            toggle dark mode and <InfoIcon mb={1} /> to view more information
            about the app or return home at any point in the sim. Sim progress
            will be saved as long as changes are not made to the cast after a
            sim has been started.
          </Text>
        </HStack>
        <HStack width="100%">
          <ChevronRightIcon />
          <Text>
            As of now, custom images must be provided through URL. Invalid
            images will use the following fallback image:
          </Text>
        </HStack>
        <AspectRatio ratio={1} minWidth="100px">
          <NextImage
            src={'/images/mirrorball.png'}
            alt="Mirroball"
            object-fit="cover"
            fill
            sizes="(max-width: 400px) 100vw"
            placeholder="blur"
            blurDataURL="/images/mirrorball.png"
            style={imageStyle}
          />
        </AspectRatio>
      </Box>

      <Box
        maxW="xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
        rounded="lg"
        my={2}
        p={3}
        boxShadow={colorMode === 'dark' ? darkModeShadow : lightModeShadow}
        bg={colorMode === 'dark' ? 'blackalpha.50' : 'whitealpha.50'}
        gap={4}
      >
        <Heading as="h4" size="md">
          Songs & Styles
        </Heading>
        <Text>Featured Songs</Text>
        <Text>
          <Link
            href="https://open.spotify.com/playlist/7uYftq6IC0p2GJ5SSfDQQf?si=bd6c99fbc1ed401e"
            isExternal
            color="blue.300"
          >
            Spotify Playlist
          </Link>
        </Text>
        <Text>
          Request a song{' '}
          <Link
            href="https://forms.gle/vUC4rnQ6dU2AdUPK6"
            isExternal
            color="blue.300"
          >
            HERE
          </Link>
          !
        </Text>
        <Text>Featured Styles</Text>
        <Wrap justify="center">
          {styles.map((style) => (
            <Tag key={style} size="md" colorScheme="gray" borderRadius="full">
              <TagLabel>{style}</TagLabel>
            </Tag>
          ))}
        </Wrap>
      </Box>

      <Button onClick={() => router.push('/setup')}>Setup</Button>
    </Box>
  );
}
