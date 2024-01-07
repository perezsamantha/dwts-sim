export const pros: {
  name: string;
  gender: 'male' | 'female' | 'other';
  image: string;
}[] = [
  {
    name: 'Daniella Karagach',
    gender: 'female',
    image: '/pros/dani.jpeg',
  },
  {
    name: 'Alan Bersten',
    gender: 'male',
    image: '/pros/alan.jpeg',
  },
];

export const seasons = Array.from({ length: 32 }, (_, i) => i + 1);
