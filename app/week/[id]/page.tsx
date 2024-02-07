'use client';
import { Box, Heading, Text } from '@chakra-ui/react';
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

  const weekTitle = () => {
    if (week == 1) return `the season premiere`;
    else if (week == numberWeeks) return `the season finale`;
    else return `week ${week}`;
  };

  return loading ? (
    <Loading />
  ) : (
    <Box display="flex" flexDirection="column" alignItems="center" padding={4}>
      <Header type="week" week={week} />
      <Heading as="h1" size="xl">
        Week {week}
      </Heading>
      <Text align="center">
        Live from Hollywood, it&#39;s {weekTitle()} of Dancing with the Stars!
      </Text>
      {dances.map((dance, i) => (
        <Dance key={i} dance={dance} />
      ))}
      <ResultsButton week={week} />
    </Box>
  );
}
