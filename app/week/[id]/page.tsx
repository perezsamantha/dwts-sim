'use client';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useBoundStore } from '../../store/useStore';
import ResultsButton from '../../ui/resultsButton';
import { useEffect, useRef, useState } from 'react';
import Header from '../../ui/header';
import Dance from '../../ui/dance';
import { useRouter } from 'next/navigation';
import Loading from '@/app/ui/loading';
import { numberTeamsRemaining } from '@/app/lib/logic';

export default function Week({ params }: { params: { id: string } }) {
  const week = Number(params.id);
  const { currentWeek, numberWeeks, prepareWeek, prepareFinale, eliminated } =
    useBoundStore((state) => state);
  const dances = useBoundStore((state) => state.weeks[week - 1]);
  const castSize = useBoundStore((state) => state.cast.length);
  const numTeams = numberTeamsRemaining(eliminated, week, castSize);
  const doubleRounds = dances?.length > numTeams;

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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={4}
      gap={2}
    >
      <Header type="week" week={week} />
      <Heading as="h1" size="xl">
        Week {week}
      </Heading>
      <Text align="center">
        Live from Hollywood, it&#39;s {weekTitle()} of Dancing with the Stars!
      </Text>
      {dances.map((dance, i) => (
        <Box
          key={i}
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          {doubleRounds ? (
            i === 0 ? (
              <Text fontSize="xl">Round 1</Text>
            ) : i === numTeams ? (
              <Text fontSize="xl">Round 2</Text>
            ) : null
          ) : null}
          <Dance dance={dance} />
        </Box>
      ))}
      <ResultsButton week={week} />
    </Box>
  );
}
