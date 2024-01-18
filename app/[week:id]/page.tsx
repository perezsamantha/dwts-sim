'use client';
import { Box, Button } from '@chakra-ui/react';
import { useSimStore } from '../store/useStore';
import { shuffleCast } from '../lib/logic';

export default function Week() {
  //TODO: redirect when needed
  const cast = useSimStore((state) => state.cast);
  const judges = useSimStore((state) => state.judges);
  const runningOrder = useSimStore((state) => state.currentRunningOrder);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <h1>Week 1</h1>
      <p>
        Live from Hollywood, it&#39;s the season premiere of Dancing with the
        Stars!
      </p>
      {runningOrder.map((ro, i) => {
        const team = cast[ro].teamMembers;
        const dance = cast[ro].dances[cast[ro].dances.length - 1];
        const scores = dance?.scores;
        return (
          <Box key={ro}>
            <p>
              {team[0].firstName} & {team[1].firstName} dancing a {dance.Style}{' '}
              to {dance.Title} by {dance.Artist}
            </p>
            <Box>
              <p>Scores -</p>
              {scores?.map((score, i) => (
                <p key={i}>
                  {judges[i]} {score}
                </p>
              ))}
            </Box>
          </Box>
        );
      })}
      <Button>Elimination</Button>
    </Box>
  );
}
