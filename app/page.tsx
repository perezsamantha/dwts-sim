import { Link, Select } from '@chakra-ui/react';
import Image from 'next/image';
import { pros, seasons } from './data/cast';
import { chacha } from './data/music';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="">
        <h1>DWTS Simulator</h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link
          href="https://abc.com"
          color="blue.400"
          _hover={{ color: 'pink.500' }}
          target="_blank"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>Get Started</h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Press Release</p>
        </Link>
        <Select placeholder="Select option">
          {pros.map((pro) => (
            <option key={pro.name} value={pro.name}>
              {pro.name}
            </option>
          ))}
        </Select>
        {seasons.map((season) => season)}
        <p>
          Random song -{' '}
          {chacha[Math.floor(Math.random() * chacha.length)].title}
        </p>
      </div>
    </main>
  );
}
