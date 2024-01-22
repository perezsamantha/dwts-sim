'use client';
import { Box, Button, Spinner } from '@chakra-ui/react';
import { useSimStore } from '../../store/useStore';
import WeekButton from '../../ui/weekButton';
import { leaderboardSort, randomElim, totalScore } from '@/app/lib/logic';
import { useEffect, useRef, useState } from 'react';
import Header from '@/app/ui/header';
import Leaderboard from '@/app/ui/leaderboard';

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
    <Spinner />
  ) : (
    <Box display="flex" flexDirection="column" alignItems="center" padding={8}>
      <Header />
      <h1>Week {week} leaderboard</h1>
      <Leaderboard cast={sortedCast} />
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
