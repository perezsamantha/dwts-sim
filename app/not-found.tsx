'use client';
import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Custom404() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-between p-12">
      <Text>Page Not Found</Text>
      <Button onClick={() => router.push('/')}>Home</Button>
    </main>
  );
}
