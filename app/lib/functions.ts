import { useEffect, useState } from 'react';

const base_url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://dwts-sim.vercel.app';

export async function getMusic() {
  const res = await fetch(`${base_url}/api/get-music`);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export async function getPros() {
  const res = await fetch(`${base_url}/api/get-pros`);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export async function getCelebs() {
  const res = await fetch(`${base_url}/api/get-celebs`);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    let scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        //height: window.innerHeight,
        height: scrollHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
