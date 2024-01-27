'use client';
import { Box, Spinner } from '@chakra-ui/react';
import { useBoundStore } from '../../../store/useStore';
import WeekButton from '../../../ui/weekButton';
import { leaderboardGroup, leaderboardSort } from '@/app/lib/logic';
import { useEffect, useRef, useState } from 'react';
import Header from '@/app/ui/header';
import Leaderboard from '@/app/ui/leaderboard';
import { useRouter } from 'next/navigation';

export default function Results({ params }: { params: { id: string } }) {
  const router = useRouter();
  const effectRan = useRef(false);
  const week = Number(params.id);
  const { cast, currentWeek, eliminated } = useBoundStore((state) => state);
  const dances = useBoundStore((state) => state.weeks[week - 1]);
  const [loading, setLoading] = useState(true);
  const groupedDances = leaderboardGroup(dances);
  const ids = leaderboardSort(groupedDances);
  const elimId = eliminated[week - 1][0];

  useEffect(() => {
    if (!effectRan.current) {
      if (currentWeek < week) router.push('/fallback');
      else setLoading(false);
    }
    effectRan.current = true;
  }, [params, currentWeek, router, week]);

  return loading ? (
    <Spinner />
  ) : (
    <Box display="flex" flexDirection="column" alignItems="center" padding={8}>
      <Header />
      <h1>Week {week} leaderboard</h1>
      <Leaderboard cast={cast} dances={groupedDances} ids={ids} />
      <h2>The couple going home is ...</h2>
      <p>
        {cast[elimId].teamMembers[0].firstName} &{' '}
        {cast[elimId].teamMembers[1].firstName}
      </p>
      <WeekButton week={week + 1} />
    </Box>
  );
}
