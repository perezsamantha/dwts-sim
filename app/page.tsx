'use client';
import { Button, Link, Select } from '@chakra-ui/react';
import Image from 'next/image';
import { chacha } from './data/music';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="">
        <h1>DWTS Simulator</h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {/* <p>
          Random song -{' '}
          {chacha[Math.floor(Math.random() * chacha.length)].title}
        </p> */}
      </div>
      <Button onClick={() => router.push('/setup')}>Setup</Button>
    </main>
  );
}
