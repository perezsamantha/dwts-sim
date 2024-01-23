import { Button } from '@chakra-ui/react';
import { useBoundStore } from '../store/useStore';
import { useRouter } from 'next/navigation';

export default function WeekButton() {
  //TODO: redirect when needed
  const { currentWeek } = useBoundStore((state) => state);
  const router = useRouter();

  const handleButton = () => {
    // update week here
    router.push(`/week${currentWeek + 1}`);
  };

  return <Button onClick={handleButton}>Week {currentWeek + 1}</Button>;
}
