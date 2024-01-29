'use client';
import { Box, Text } from '@chakra-ui/react';
import { useBoundStore } from '../store/useStore';
import WeekButton from '../ui/weekButton';
import HomeButton from '../ui/homeButton';

export default function Fallback() {
  const currentWeek = useBoundStore((state) => state.currentWeek);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={8}>
      <Text>Invalid page! Return to most recent week below.</Text>
      {currentWeek == 0 ? <HomeButton /> : <WeekButton week={currentWeek} />}
    </Box>
  );
}
