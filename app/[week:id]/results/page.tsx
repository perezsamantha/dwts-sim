'use client';
import { Box, Button } from '@chakra-ui/react';
import { useSimStore } from '../../store/useStore';
import WeekButton from '../../ui/weekButton';
import { leaderboardSort, randomElim, totalScore } from '@/app/lib/logic';
import { useEffect, useRef, useState } from 'react';

export default function Results() {
  const week = useSimStore((state) => state.currentWeek);
  const cast = useSimStore((state) => state.cast);
  const runningOrder = useSimStore((state) => state.currentRunningOrder);
  const sortedCast = leaderboardSort([...cast], runningOrder.length);
  const eliminateTeam = useSimStore((state) => state.eliminateTeam);
  const effectRan = useRef(false);
  const [loading, setLoading] = useState(true);
  const index = randomElim(runningOrder);
  const [elimIndex] = useState(index);

  useEffect(() => {
    if (!effectRan.current) {
      eliminateTeam(elimIndex);
      setLoading(false);
    }
    effectRan.current = true;
  }, [eliminateTeam, elimIndex, runningOrder]);

  return loading ? (
    <p>loading</p>
  ) : (
    <Box display="flex" flexDirection="column" alignItems="center">
      <h1>Week {week} leaderboard</h1>
      {sortedCast.map((obj, i) => {
        const team = obj.teamMembers;
        const dance = obj.dances[obj.dances.length - 1];
        const scores = dance.scores;
        return (
          <Box key={i}>
            <p>
              {team[0].firstName} & {team[1].firstName} - {dance.Style} -{' '}
              {totalScore(scores)}
            </p>
          </Box>
        );
      })}
      <h2>The couple going home is ...</h2>
      <p>
        {cast[elimIndex].teamMembers[0].firstName} &{' '}
        {cast[elimIndex].teamMembers[1].firstName}
      </p>
      <p>index: {elimIndex}</p>
      <WeekButton />
    </Box>
  );
}
