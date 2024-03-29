import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function SummaryButton() {
  const router = useRouter();

  const handleButton = () => {
    router.push(`/summary`);
  };

  return (
    <Button onClick={handleButton} mt={4} mb={8}>
      Summary
    </Button>
  );
}
