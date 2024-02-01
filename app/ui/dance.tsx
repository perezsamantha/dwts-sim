'use client';
import { Box, Center, Flex, Text, useColorMode } from '@chakra-ui/react';
import { useBoundStore } from '../store/useStore';
import { Dance } from '../store/interfaces';
import CastImage from './castImage';
import { totalScore } from '../lib/logic';

export default function Dance(props: { dance: Dance }) {
  const judges = useBoundStore((state) => state.judges);

  const dance = props.dance;
  const scores = dance.scores;

  const { colorMode } = useColorMode();

  const lightModeShadow = '0 0 50px -25px rgba(0, 0, 0, 0.25)';
  // const darkModeShadow =
  //   'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px';
  const darkModeShadow =
    'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 0px 10px,rgba(0, 0, 0, 0.5) 0px 0 50px -15px';

  const OneTeam = () => {
    const celeb = useBoundStore(
      (state) => state.cast[props.dance.teamId].teamMembers[0]
    );
    const pro = useBoundStore(
      (state) => state.cast[props.dance.teamId].teamMembers[1]
    );
    return (
      <>
        <Flex flexDirection="row" minWidth="250px" maxWidth="500px">
          <Box width="100%" mr={2}>
            <CastImage data={celeb} />
          </Box>
          <Box width="100%">
            <CastImage data={pro} />
          </Box>
        </Flex>
        <Text margin={1}>
          {celeb.firstName} & {pro.firstName}
        </Text>
      </>
    );
  };

  const MultipleTeams = () => {
    const cast = useBoundStore((state) => state.cast);
    return (
      <>
        {dance.teamIds?.map((id) => (
          <Box
            key={id}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Flex flexDirection="row" minWidth="250px">
              <Box width="100%" mr={2}>
                <CastImage data={cast[id].teamMembers[0]} />
              </Box>
              <Box width="100%" mr={2}>
                <CastImage data={cast[id].teamMembers[1]} />
              </Box>
            </Flex>
            <Text margin={1}>
              {cast[id].teamMembers[0].firstName} &{' '}
              {cast[id].teamMembers[1].firstName}
            </Text>
          </Box>
        ))}
      </>
    );
  };

  return (
    <Box
      width="95%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      rounded="lg"
      my={4}
      maxWidth="500px"
      py={5}
      px={2}
      boxShadow={colorMode === 'dark' ? darkModeShadow : lightModeShadow}
      bg={colorMode === 'dark' ? 'blackalpha.50' : 'whitealpha.900'}
    >
      {dance.teamIds ? <MultipleTeams /> : <OneTeam />}
      <Text margin={1}>{dance.style}</Text>
      <Text margin={1}>to</Text>
      <Text margin={1}>
        &#34;{dance.title}&#34; by {dance.artist}
      </Text>

      <Text margin={1}>Scores </Text>
      <Center>
        {scores?.map((score, i) => (
          <Text key={i} margin={1} align="center">
            {judges[i]}: {score}
          </Text>
        ))}
      </Center>
      <Text>Total</Text>
      <Text>{totalScore(scores)}</Text>
      {dance.uri && (
        <Box
          width="95%"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text margin={1}>Song Preview</Text>
          <iframe
            style={{
              borderRadius: '14px',
            }}
            //src="https://open.spotify.com/embed/track/11dFghVXANMlKmJXsNCbNl?utm_source=generator"
            src={`https://open.spotify.com/embed/track/${dance.uri.slice(
              14
            )}?utm_source=generator`}
            // width="50%"
            width="100%"
            height="80"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </Box>
      )}
    </Box>
  );
}
