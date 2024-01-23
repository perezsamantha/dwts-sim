'use client';
import { Box, Button, Spinner } from '@chakra-ui/react';
import { useSimStore } from '../store/useStore';
import WeekButton from '../ui/weekButton';
import ResultsButton from '../ui/resultsButton';
import { useEffect, useRef, useState } from 'react';
import Header from '../ui/header';
import Dance from '../ui/dance';

export default function Week() {
  //TODO: redirect when needed
  const cast = useSimStore((state) => state.cast);
  const judges = useSimStore((state) => state.judges);
  const prepareDances = useSimStore((state) => state.prepareDances);
  const runningOrder = useSimStore((state) => state.currentRunningOrder);
  const [loading, setLoading] = useState(true);
  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current) {
      prepareDances();
      setLoading(false);
    }
    effectRan.current = true;
  }, [prepareDances]);

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
      <iframe
        style={{ borderRadius: '12px' }}
        src="https://open.spotify.com/embed/track/11dFghVXANMlKmJXsNCbNl?utm_source=generator"
        width="50%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      {runningOrder.map((ro) => (
        <Dance key={ro} team={cast[ro]} />
      ))}
      <ResultsButton />
    </Box>
  );
}
