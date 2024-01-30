import { Dance, Team, Dancer, Song, Pro, Celeb } from '../store/interfaces';
import music from '../data/music.json';
import celebs from '../data/celebs.json';
import pros from '../data/pros.json';
import { styles } from '../data/styles';

// shuffle music
// O(n) - durstenfeld shuffle, optimized fisher-yates
export const shuffleMusic = (music: Song[]) => {
  for (let i = music.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    var tmp = music[i];
    music[i] = music[j];
    music[j] = tmp;
  }
  return music;
};

// reduce/sort music data by style
const sortMusicByStyle = (music: Song[]) =>
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

export const sortMusic = () => sortMusicByStyle(shuffleMusic(music));

export const sortStyles = () => styles.sort((a, b) => (a < b ? -1 : 1));

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

// group dances by team
export const leaderboardGroup = (dances: Dance[]) =>
  dances?.reduce(
    (previous, currentItem) => {
      let value: number;
      if (currentItem.teamIds) {
        currentItem['teamIds'].map((id) => {
          value = id;
          const existing = previous[value] || [];
          previous = {
            ...previous,
            [id]: [...existing, currentItem],
          };
        });
        return previous;
      } else {
        value = currentItem['teamId'];
        const existing = previous[value] || [];
        return {
          ...previous,
          [value]: [...existing, currentItem],
        };
      }
    },
    {} as { [teamId: string]: Dance[] }
  );

// sort dances by scores
export const leaderboardSort = (dances: { [teamId: string]: Dance[] }) => {
  if (!dances) return [];
  const teamIds = Object.keys(dances);
  teamIds.sort((a, b) => {
    let scoresA = 0;
    for (let i = 0; i < dances[a].length; i++)
      scoresA += totalScore(dances[a][i].scores);
    let scoresB = 0;
    for (let i = 0; i < dances[b].length; i++)
      scoresB += totalScore(dances[b][i].scores);
    if (scoresA < scoresB) return 1;
    else return -1;
  });
  return teamIds;
};

// total score
export const totalScore = (scores: number[]) => scores.reduce((a, b) => a + b);

// determine placement
export const calculatePlacement = (cast: Team[]) =>
  cast.filter((team) => !team.placement).length;

// randomize cast
export const randomizeCast = (numberTeams: number) => {
  const celebIds = new Set(),
    proIds = new Set();
  const cast = new Array<Team>();
  for (let i = 0; i < numberTeams; i++) {
    let celebId = Math.floor(Math.random() * celebs.length);
    while (celebIds.has(celebId))
      celebId = Math.floor(Math.random() * celebs.length);
    celebIds.add(celebId);
    const celeb = createDancerObj(celebId, 'celeb');

    let proId = Math.floor(Math.random() * pros.length);
    while (proIds.has(proId)) proId = Math.floor(Math.random() * pros.length);
    proIds.add(proId);
    const pro = createDancerObj(proId, 'pro');

    cast.push({
      placement: 0,
      teamMembers: [celeb, pro],
      dances: [],
      styles: shuffleStyles().slice(),
    });
  }
  return cast;
};

// randomize ONE team
export const randomizeTeam = () => {
  let celebId = Math.floor(Math.random() * celebs.length);
  const celeb = createDancerObj(celebId, 'celeb');
  let proId = Math.floor(Math.random() * pros.length);
  const pro = createDancerObj(proId, 'pro');

  return {
    placement: 0,
    teamMembers: [celeb, pro],
    dances: [],
    styles: shuffleStyles().slice(),
  };
};

// create sim celeb object
const createDancerObj = (id: number, type: string) => {
  let dancer, image;
  //const dancer: Celeb | Pro = type === 'celeb' ? celebs[id] : pros[id];
  if (type === 'celeb') {
    dancer = celebs[id];
    image = `/images/${dancer.season}/${dancer.image}.jpg`;
  } else {
    dancer = pros[id];
    image = `/images/pros/${dancer.image}.jpg`;
  }

  const obj: Dancer = {
    firstName: dancer.firstName,
    lastName: dancer.lastName,
    image: image,
    dataIndex: id,
    type: type,
  };
  return obj;
};

// shuffle for team dance
// fischer-yates algorithm
export const teamDanceShuffle = (runningOrder: number[]) => {
  for (let i = runningOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [runningOrder[i], runningOrder[j]] = [runningOrder[j], runningOrder[i]];
  }
  return runningOrder;
};

// determine if double elim
// use numberTeamsRemaining - (numberWeeks - currentWeek) to determine elim type
export const eliminate = (
  arr: number[],
  numberWeeks: number,
  currentWeek: number
) => {
  const val = arr.length - (numberWeeks - currentWeek);
  // no elim
  if (val < 3) {
    // no elim
    if (arr.length - 3 < numberWeeks - currentWeek - 1) {
      // MUST be no elim
      return [];
    } else {
      // randomly decide if no elim (20% chance)
      if (Math.random() < 0.2) return [];
      else return singleElim(arr);
    }
  } else if (val > 4) {
    // double elim
    if (numberWeeks - currentWeek < val) {
      // MUST be double elim
      return doubleElim(arr);
    } else {
      // randomly decide if double elim (20% chance)
      if (Math.random() < 0.2) {
        return doubleElim(arr);
      } else return singleElim(arr);
    }
  } else {
    // single elim
    return singleElim(arr);
  }
};

//
const singleElim = (arr: number[]) => [
  arr[Math.floor(Math.random() * arr.length)],
];

const doubleElim = (arr: number[]) => {
  const arrCopy = [...arr];
  const first = Math.floor(Math.random() * arr.length);
  arrCopy.splice(first, first);
  const second = Math.floor(Math.random() * arrCopy.length);
  return [arr[first], arrCopy[second]];
};

// pick team to be eliminated
export const randomElim = (arr: number[]) =>
  arr[Math.floor(Math.random() * arr.length)];

// TODO: determine finale placements

// sort cast by placement
export const sortByPlacement = (cast: Team[]) =>
  cast.sort((a, b) => (a.placement < b.placement ? -1 : 1));

// calculate average score
export const calculateAverage = (dances: Dance[]) =>
  Math.round(
    (dances.reduce(function (sum, value) {
      return sum + totalScore(value.scores);
    }, 0) /
      dances.length /
      3) *
      100
  ) / 100;
