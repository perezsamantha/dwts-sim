'use client';
import { Box } from '@chakra-ui/react';
import { useBoundStore } from '../../store/useStore';
import ResultsButton from '../../ui/resultsButton';
import { useEffect, useRef, useState } from 'react';
import Header from '../../ui/header';
import Dance from '../../ui/dance';
import { useRouter } from 'next/navigation';
import Loading from '@/app/ui/loading';

export default function Week({ params }: { params: { id: string } }) {
  const week = Number(params.id);
  const { currentWeek, numberWeeks, prepareWeek, prepareFinale } =
    useBoundStore((state) => state);
  const dances = useBoundStore((state) => state.weeks[week - 1]);

  const [loading, setLoading] = useState(true);
  const effectRan = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!effectRan.current) {
      if (currentWeek + 1 < week || week > numberWeeks)
        router.push('/fallback');
      else {
        if (currentWeek + 1 === week) {
          if (currentWeek + 1 == numberWeeks) prepareFinale();
          else prepareWeek();
        }
        setLoading(false);
      }
    }
    effectRan.current = true;
  }, [
    prepareWeek,
    params,
    currentWeek,
    router,
    week,
    prepareFinale,
    numberWeeks,
  ]);

  return loading ? (
    <Loading />
  ) : (
    <Box display="flex" flexDirection="column" alignItems="center" padding={8}>
      <Header type="week" week={week} />
      <h1>Week {week}</h1>
      <p>
        Live from Hollywood, it&#39;s the season premiere of Dancing with the
        Stars!
      </p>
      {dances.map((dance, i) => (
        <Dance key={i} dance={dance} />
      ))}
      <ResultsButton />
    </Box>
  );
}
