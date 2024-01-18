import { Team } from '../store/useStore';
import music from '../data/music.json';

interface Song {
  Title: string;
  Artist: string;
  Style: string;
  scores?: number[];
}

interface Celeb {
  firstName: string;
  lastName: string;
  image: string;
  gender: string;
  season: string;
  placement: string;
}

interface Pro {
  firstName: string;
  lastName: string;
  image: string;
  gender: string;
  current: string;
}

const styles = [
  'Cha Cha',
  'Viennese Waltz',
  'Samba',
  'Salsa',
  'Argentine Tango',
  'Tango',
  'Quickstep',
  'Contemporary',
  'Jazz',
  'Rumba',
  'Foxtrot',
];

// reduce/sort music data by style
// export const sortMusic = <T, K extends keyof any>(
//   list: T[],
//   getKey: (item: T) => K
// ) =>
//   list.reduce(
//     (previous, currentItem) => {
//       const group = getKey(currentItem);
//       if (!previous[group]) previous[group] = [];
//       previous[group].push(currentItem);
//       return previous;
//     },
//     {} as Record<K, T[]>
//   );
export const sortMusic = (music: Song[]) =>
  music.reduce(
    (previous, currentItem) => {
      const value: string = currentItem['Style'];
      const existing = previous[value] || [];
      return {
        ...previous,
        [value]: [...existing, currentItem],
      };
    },
    {} as { [style: string]: Song[] }
  );

export const sortedMusic = sortMusic(music);

//sort celebs by season, and placement
export const sortCelebs = (celebs: Celeb[]) =>
  celebs.sort((a, b) => {
    if (a.season !== b.season)
      return Number(a.season) > Number(b.season) ? -1 : 1;
    else return Number(a.placement) > Number(b.placement) ? 1 : -1;
  });

// sort pros by active and alphabetical
export const sortPros = (pros: Pro[]) =>
  pros.sort((a, b) => {
    if (a.current !== b.current) return a.current === 'true' ? -1 : 1;
    else return a.firstName > b.firstName ? 1 : -1;
  });

// shuffle cast (running order) and remove eliminated teams
export const shuffleCast = (cast: Team[]) => {
  let array: Array<number> = [];
  cast.map((team, i) => {
    if (team.placement) array.push(i);
  });
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// shuffle styles
export const shuffleStyles = () => {
  let array = styles;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// random scores
export const randomScores = () => {
  let array: number[] = [];
  for (let i = 0; i < 3; i++) array.push(Math.floor(Math.random() * 10) + 1);
  return array;
};

//determine if double elim

// randomize songs/styles
