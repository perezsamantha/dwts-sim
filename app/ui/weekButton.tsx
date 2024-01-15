import { Button } from '@chakra-ui/react';
import { useSimStore } from '../store/useStore';
import { shuffleCast } from '../lib/logic';
import { useRouter } from 'next/navigation';

export default function WeekButton() {
  //TODO: redirect when needed
  const cast = useSimStore((state) => state.cast);
  const prepareDances = useSimStore((state) => state.prepareDances);
  const router = useRouter();

  const handleButton = () => {
    const runningOrder = shuffleCast(cast);
    prepareDances(runningOrder);
    router.push('/week1');
  };

  return <Button onClick={handleButton}>Next Week</Button>;
}
