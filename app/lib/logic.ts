import { Team } from '../store/useStore';
import music from '../data/music.json';

interface Song {
  title: string;
  artist: string;
  style: string;
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
  'Waltz',
  'Paso Doble',
  'Jive',
  'Charleston',
];

// shuffle music
// O(n) - durstenfeld shuffle, optimized fisher-yates
const shuffleMusic = (music: Song[]) => {
  for (let i = music.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    var tmp = music[i];
    music[i] = music[j];
    music[j] = tmp;
  }
  return music;
};

// reduce/sort music data by style
// TODO: shuffle songs
export const sortMusic = (music: Song[]) =>
  music.reduce(
    (previous, currentItem) => {
      const value: string = currentItem['style'];
      const existing = previous[value] || [];
      return {
        ...previous,
        [value]: [...existing, currentItem],
      };
    },
    {} as { [style: string]: Song[] }
  );

export const sortedMusic = sortMusic(shuffleMusic(music));

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
    if (team.placement == 0) array.push(i);
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

// sort cast for leaderboard
export const leaderboardSort = (cast: Team[], numberTeams: number) => {
  cast.sort((a, b) =>
    totalScore(a.dances[a.dances.length - 1].scores) >
    totalScore(b.dances[b.dances.length - 1].scores)
      ? -1
      : 1
  );

  return cast.filter(
    (team) => team.placement == 0 || team.placement == numberTeams
  );
};

// total score
export const totalScore = (scores: number[]) => scores.reduce((a, b) => a + b);

// pick team to be eliminated
export const randomElim = (ro: number[]) =>
  ro[Math.floor(Math.random() * ro.length)];

// determine placement
export const calculatePlacement = (cast: Team[]) =>
  cast.filter((team) => !team.placement).length;

// determine if double elim

// randomize style for redemption dance in finale

// TODO: BUILD SIM FUNCTION
// set up entire sim before beginning week 1 ???
