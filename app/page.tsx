'use client';
import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Header from './ui/header';

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-between p-12">
      <Header type="home" week={0} />
      <Text>DWTS Simulator</Text>
      <Text>tips</Text>
      <Text>- invalid images will use a fallback image of a mirrorball</Text>
      <Text>Saved Sims?</Text>
      <Button onClick={() => router.push('/setup')}>Setup</Button>
    </main>
  );
}
