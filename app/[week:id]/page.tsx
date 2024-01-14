'use client';
import { Box, Button } from '@chakra-ui/react';
import { useSimStore } from '../store/useStore';
import { shuffleCast } from '../lib/logic';

export default function Week() {
  //TODO: redirect when needed
  const cast = useSimStore((state) => state.cast);
  const music = useSimStore((state) => state.music);
  const runningOrder = shuffleCast(cast);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <h1>Week 1</h1>
      <p>
        Live from Hollywood, it&#39;s the season premiere of Dancing with the
        Stars!
      </p>
      <p>
        First up, dancing a cha cha to Cuff It by Beyonce, it&#39;s Ariana and
        Daniella
      </p>
      <p>Score: Carrie Ann Inaba - 7, Derek Hough - 10, Bruno Tonioli - 9</p>
      {runningOrder.map((ro) => (
        <p key={ro}>
          Team {ro + 1} - {cast[ro].teamMembers[0].firstName} &{' '}
          {cast[ro].teamMembers[1].firstName} dancing a {cast[ro].styles[0]} to{' '}
          {music[cast[ro].styles[0]][0].Title} by{' '}
          {music[cast[ro].styles[0]][0].Artist}
        </p>
      ))}
      <Button>Elimination</Button>
    </Box>
  );
}
