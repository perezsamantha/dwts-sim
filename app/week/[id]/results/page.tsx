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
  const elimIds = eliminated[week - 1];

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
      {elimIds ? (
        <Box>
          <h2>The couple{elimIds.length > 1 && 's'} going home is ...</h2>
          {elimIds.map((id) => (
            <p key={id}>
              {cast[id].teamMembers[0].firstName} &{' '}
              {cast[id].teamMembers[1].firstName}
            </p>
          ))}
        </Box>
      ) : (
        <h2>No Elimination !!!</h2>
      )}
      <WeekButton week={week + 1} />
    </Box>
  );
}
