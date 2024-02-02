'use client';
import { Box } from '@chakra-ui/react';
import { useBoundStore } from '../../../store/useStore';
import WeekButton from '../../../ui/weekButton';
import { leaderboardGroup, leaderboardSort } from '@/app/lib/logic';
import { useEffect, useRef, useState } from 'react';
import Header from '@/app/ui/header';
import Leaderboard from '@/app/ui/leaderboard';
import { useRouter } from 'next/navigation';
import SummaryButton from '@/app/ui/summaryButton';
import Loading from '@/app/ui/loading';
import ElimPreview from '@/app/ui/elimPreview';

export default function Results({ params }: { params: { id: string } }) {
  const router = useRouter();
  const effectRan = useRef(false);
  const week = Number(params.id);
  const { cast, currentWeek, numberWeeks, eliminated } = useBoundStore(
    (state) => state
  );
  const dances = useBoundStore((state) => state.weeks[week - 1]);
  const [loading, setLoading] = useState(true);
  const groupedDances = leaderboardGroup(dances);
  const ids = leaderboardSort(groupedDances);
  const elimIds = eliminated[week - 1];

  useEffect(() => {
    if (!effectRan.current) {
      if (currentWeek < week || week > numberWeeks) router.push('/fallback');
      else setLoading(false);
    }
    effectRan.current = true;
  }, [params, currentWeek, router, week, numberWeeks]);

  return loading ? (
    <Loading />
  ) : (
    <Box display="flex" flexDirection="column" alignItems="center" padding={8}>
      <Header type="results" week={week} />
      <h1>Week {week} leaderboard</h1>
      <Leaderboard cast={cast} dances={groupedDances} ids={ids} />

      {currentWeek === numberWeeks ? (
        <SummaryButton />
      ) : (
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <ElimPreview cast={cast} elimIds={elimIds} />
          <WeekButton week={week + 1} />
        </Box>
      )}
    </Box>
  );
}
