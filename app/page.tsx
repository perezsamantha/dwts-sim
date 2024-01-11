'use client';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="">
        <h1>DWTS Simulator</h1>
      </div>
      <Button onClick={() => router.push('/setup')}>Setup</Button>
    </main>
  );
}
