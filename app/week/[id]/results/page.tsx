'use client';
import { Box, Heading } from '@chakra-ui/react';
import { useBoundStore } from '../../../store/useStore';
import WeekButton from '../../../ui/weekButton';
import { leaderboardGroup, leaderboardSort } from '@/app/lib/logic';
import { useEffect, useRef, useState } from 'react';
import Header from '@/app/ui/header';
import Leaderboard from '@/app/ui/leaderboard';
import { useRouter } from 'next/navigation';
import Loading from '@/app/ui/loading';
import FinalePlacements from '@/app/ui/finalePlacements';
import ElimWrapper from '@/app/ui/elimWrapper';
import FinalTwoButton from '@/app/ui/finalTwoButton';

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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={4}
      gap={2}
    >
      <Header type="results" week={week} />
      <Heading as="h1" size="lg">
        Week {week} leaderboard
      </Heading>
      <Leaderboard cast={cast} dances={groupedDances} ids={ids} />

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={4}
        gap={2}
      >
        {week === numberWeeks ? (
          <>
            {' '}
            <FinalePlacements cast={cast} placements={elimIds} />
            <FinalTwoButton />
          </>
        ) : (
          <>
            <ElimWrapper cast={cast} elimIds={elimIds} />
            <WeekButton week={week + 1} />
          </>
        )}
      </Box>
    </Box>
  );
}
