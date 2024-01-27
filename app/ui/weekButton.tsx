import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function WeekButton(props: { week: number }) {
  const router = useRouter();

  const handleButton = () => {
    router.push(`/week${props.week}`);
  };

  return <Button onClick={handleButton}>Week {props.week}</Button>;
}
