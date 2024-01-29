'use client';
import { Box, Button, Text } from '@chakra-ui/react';
import { useBoundStore } from '../store/useStore';
import { useRouter } from 'next/navigation';
import WeekButton from '../ui/weekButton';

export default function Fallback() {
  const currentWeek = useBoundStore((state) => state.currentWeek);
  const router = useRouter();

  const handleButton = () => {
    router.push(`/`);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={8}>
      <Text>Invalid page! Return to most recent week below.</Text>
      {currentWeek == 0 ? (
        <Button onClick={handleButton}>Return Home</Button>
      ) : (
        <WeekButton week={currentWeek} />
      )}
    </Box>
  );
}
