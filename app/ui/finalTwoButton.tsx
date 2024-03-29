import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function FinalTwoButton() {
  const router = useRouter();

  const handleButton = () => {
    router.push(`/finaltwo`);
  };

  return (
    <Button onClick={handleButton} mt={4} mb={8}>
      Final 2
    </Button>
  );
}
