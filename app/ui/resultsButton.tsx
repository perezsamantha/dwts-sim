import { Button } from '@chakra-ui/react';
import { useBoundStore } from '../store/useStore';
import { useRouter } from 'next/navigation';

export default function ResultsButton() {
  const week = useBoundStore((state) => state.currentWeek);
  const router = useRouter();

  const handleButton = () => {
    router.push(`/week${week}/results`);
  };

  return <Button onClick={handleButton}>Results</Button>;
}
