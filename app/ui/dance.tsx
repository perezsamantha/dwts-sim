'use client';
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { Team, useSimStore } from '../store/useStore';
import CastImage from './castImage';
import { totalScore } from '../lib/logic';

export default function Dance(props: { team: Team }) {
  //TODO: redirect when needed
  const judges = useSimStore((state) => state.judges);
  const celeb = props.team.teamMembers[0];
  const pro = props.team.teamMembers[1];
  const dance = props.team.dances[props.team.dances.length - 1];
  const scores = dance.scores;

  return (
    <Box
      width="95%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      border="2px solid red"
      marginBottom={5}
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
      <Text margin={1}>Song Preview</Text>
      <iframe
        style={{
          borderRadius: '14px',
        }}
        src="https://open.spotify.com/embed/track/11dFghVXANMlKmJXsNCbNl?utm_source=generator"
        // width="50%"
        width="100%"
        height="80"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </Box>
  );
}
