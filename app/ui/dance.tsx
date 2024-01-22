'use client';
import { Box, Text } from '@chakra-ui/react';
import { Team, useSimStore } from '../store/useStore';
import WeekButton from '../ui/weekButton';
import ResultsButton from '../ui/resultsButton';

export default function Dance(props: { team: Team }) {
  //TODO: redirect when needed
  const judges = useSimStore((state) => state.judges);
  const celeb = props.team.teamMembers[0];
  const pro = props.team.teamMembers[1];
  const dance = props.team.dances[props.team.dances.length - 1];
  const scores = dance.scores;

  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
      <Text margin={1}>
        {celeb.firstName} & {pro.firstName} dancing a {dance.Style} to{' '}
        {dance.Title} by {dance.Artist}
      </Text>
      <Box display="flex" flexDirection="row">
        <Text margin={1}>Scores - </Text>
        {scores?.map((score, i) => (
          <Text key={i} margin={1}>
            {judges[i]}: {score}
          </Text>
        ))}
      </Box>
    </Box>
  );
}
