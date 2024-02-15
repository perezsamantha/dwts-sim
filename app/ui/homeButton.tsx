import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function HomeButton() {
  const router = useRouter();

  const handleButton = () => {
    router.push(`/`);
  };

  return (
    <Button onClick={handleButton} mt={4} mb={8}>
      Home
    </Button>
  );
}
