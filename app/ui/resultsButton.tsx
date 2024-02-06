import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function ResultsButton(props: { week: number }) {
  const router = useRouter();

  const handleButton = () => {
    router.push(`/week${props.week}/results`);
  };

  return <Button onClick={handleButton}>Results</Button>;
}
