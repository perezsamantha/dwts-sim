'use client';
import { Box, Button, Spinner } from '@chakra-ui/react';
import { useBoundStore } from '../../store/useStore';
import ResultsButton from '../../ui/resultsButton';
import { useEffect, useRef, useState } from 'react';
import Header from '../../ui/header';
import Dance from '../../ui/dance';
import { useRouter } from 'next/navigation';

export default function Week({ params }: { params: { id: string } }) {
  //TODO: redirect when needed
  const currentWeek = useBoundStore((state) => state.currentWeek);
  const prepareWeek = useBoundStore((state) => state.prepareWeek);
  const dances = useBoundStore((state) => state.weeks[currentWeek - 1]);

  const [loading, setLoading] = useState(true);
  const effectRan = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!effectRan.current) {
      if (currentWeek + 1 < Number(params.id)) router.push('/');
      prepareWeek();
      setLoading(false);
    }
    effectRan.current = true;
  }, [prepareWeek, params, currentWeek, router]);

  return loading ? (
    <Spinner />
  ) : (
    <Box display="flex" flexDirection="column" alignItems="center" padding={8}>
      <Header />
      <h1>Week 1</h1>
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
