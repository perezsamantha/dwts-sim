'use client';
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { Dance, useBoundStore } from '../store/useStore';
import CastImage from './castImage';
import { totalScore } from '../lib/logic';

export default function Dance(props: { dance: Dance }) {
  const judges = useBoundStore((state) => state.judges);
  const celeb = useBoundStore(
    (state) => state.cast[props.dance.teamId].teamMembers[0]
  );
  const pro = useBoundStore(
    (state) => state.cast[props.dance.teamId].teamMembers[1]
  );
  const dance = props.dance;
  const scores = dance.scores;

  return (
    <Box
      width="95%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      border="2px solid red"
      marginBottom={5}
      maxWidth="500px"
    >
      <Flex flexDirection="row" minWidth="250px">
        <CastImage data={celeb} />
        <CastImage data={pro} />
      </Flex>
      <Text margin={1}>
        {celeb.firstName} & {pro.firstName}
      </Text>
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
