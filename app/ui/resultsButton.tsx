import { Button } from '@chakra-ui/react';
import { useSimStore } from '../store/useStore';
import { useRouter } from 'next/navigation';

export default function ResultsButton() {
  //TODO: redirect when needed
  const week = useSimStore((state) => state.currentWeek);
  const router = useRouter();

  const handleButton = () => {
    router.push(`/week${week}/results`);
  };

  return <Button onClick={handleButton}>Results</Button>;
}
