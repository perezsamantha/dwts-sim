'use client';
import { Box, Button, Spinner } from '@chakra-ui/react';
import { useBoundStore } from '../../../store/useStore';
import WeekButton from '../../../ui/weekButton';
import { leaderboardSort, randomElim } from '@/app/lib/logic';
import { useEffect, useRef, useState } from 'react';
import Header from '@/app/ui/header';
import Leaderboard from '@/app/ui/leaderboard';
import { useRouter } from 'next/navigation';

export default function Results({ params }: { params: { id: string } }) {
  const week = Number(params.id);
  const cast = useBoundStore((state) => state.cast);
  const currentWeek = useBoundStore((state) => state.currentWeek);
  const runningOrder = useBoundStore((state) => state.currentRunningOrder);
  const sortedCast = leaderboardSort([...cast], runningOrder.length);
  const eliminateTeam = useBoundStore((state) => state.eliminateTeam);
  const effectRan = useRef(false);
  const [loading, setLoading] = useState(true);
  const index = randomElim(runningOrder);
  const [elimIndex] = useState(index);
  const router = useRouter();

  useEffect(() => {
    if (!effectRan.current) {
      if (currentWeek < week) router.push('/fallback');
      else {
        if (currentWeek === week) eliminateTeam(elimIndex);
        setLoading(false);
      }
    }
    effectRan.current = true;
  }, [eliminateTeam, elimIndex, params, currentWeek, router, week]);

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
      <WeekButton week={week + 1} />
    </Box>
  );
}
