import { Button } from '@chakra-ui/react';
import { useSimStore } from '../store/useStore';
import { useRouter } from 'next/navigation';

export default function WeekButton() {
  //TODO: redirect when needed
  const { currentWeek } = useSimStore((state) => state);
  const router = useRouter();

  const handleButton = () => {
    router.push(`/week${currentWeek + 1}`);
  };

  return <Button onClick={handleButton}>Week {currentWeek + 1}</Button>;
}