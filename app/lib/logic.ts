import { Dance, Team, Dancer, Song, Pro, Celeb } from '../store/interfaces';
import music from '../data/music.json';
import celebs from '../data/celebs.json';
import pros from '../data/pros.json';
import { styles } from '../data/styles';

const weights = [
  [2, 2, 4, 10, 15, 23, 23, 15, 4, 2],
  [2, 2, 2, 4, 10, 15, 20, 20, 15, 10],
  [1, 1, 2, 2, 4, 10, 15, 20, 30, 25],
  [1, 1, 1, 1, 2, 2, 2, 10, 15, 65],
];

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
export const createDancerObj = (id: number, type: string) => {
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
  ids: number[],
  cast: Team[],
  numberWeeks: number,
  currentWeek: number
) => {
  const val = ids.length - (numberWeeks - currentWeek);
  // no elim
  if (val < 3) {
    // no elim
    if (ids.length - 3 < numberWeeks - currentWeek - 1) {
      // MUST be no elim
      return [];
    } else {
      // randomly decide if no elim (20% chance)
      if (Math.random() < 0.2) return [];
      else return singleElim(cast, ids);
    }
  } else if (val > 4) {
    // double elim
    if (numberWeeks - currentWeek < val) {
      // MUST be double elim
      return doubleElim(cast, ids);
    } else {
      // randomly decide if double elim (20% chance)
      if (Math.random() < 0.2) {
        return doubleElim(cast, ids);
      } else return singleElim(cast, ids);
    }
  } else {
    // single elim
    return singleElim(cast, ids);
  }
};

// eliminate based on rank
export const randomElimId = (cast: Team[], ids: number[]) => {
  // const ids = Array.from(Array(cast.length).keys()).filter(
  //   (id) => !cast[id].placement
  // );

  ids.sort((a, b) =>
    cumulativeScore(cast[a].dances) < cumulativeScore(cast[b].dances) ? 1 : -1
  );

  const cumulativeRanking = runningSum(
    Array.from({ length: ids.length }, (_, i) => i + 1)
  );

  let randomVal = Math.random() * cumulativeRanking[ids.length - 1];
  for (let i = 0; i < ids.length; i++)
    if (randomVal <= cumulativeRanking[i]) return ids[i];

  return ids[ids.length - 1];
};

const singleElim = (cast: Team[], ids: number[]) => [randomElimId(cast, ids)];

const doubleElim = (cast: Team[], ids: number[]) => {
  let res = [];
  const first = randomElimId(cast, ids);
  res.push(first);
  ids = ids.filter((id) => id !== first);
  const second = randomElimId(cast, ids);
  res.push(second);
  return res;
};

// determine finale placements
export const determineFinalePlacements = (cast: Team[], ids: number[]) => {
  let res = [];
  const len = ids.length;
  for (let i = 0; i < len - 1; i++) {
    const id = randomElimId(cast, ids);
    res.push(id);
    ids = ids.filter((x) => x !== id);
  }
  res.push(ids[0]);
  return res;
};

// sort cast by placement
export const sortByPlacement = (cast: Team[]) =>
  cast.sort((a, b) => (a.placement < b.placement ? -1 : 1));

// calculate average score
export const calculateAverage = (dances: Dance[]) =>
  Math.round((cumulativeScore(dances) / dances.length / 3) * 100) / 100;

// build cast from saved cast
export const buildCast = (cast: Dancer[][]) =>
  cast.map((obj) => ({
    placement: 0,
    dances: [],
    styles: shuffleStyles().slice(),
    teamMembers: obj,
  }));

const runningSum = (arr: number[]) => {
  let i,
    sum = 0;
  let res = [];
  for (i in arr) {
    sum += arr[i];
    res.push(sum);
  }
  return res;
};

const weightedSums = weights.map((arr) => runningSum(arr));

// calculate scores
export const calculateScores = (currentWeek: number, numberWeeks: number) => {
  let array: number[] = [];
  for (let i = 0; i < 3; i++)
    array.push(randomScoreVal(currentWeek, numberWeeks) + 1);
  return array;
};

// get random score value based on current week and scores weights
const randomScoreVal = (currentWeek: number, numberWeeks: number) => {
  const weightsIndex = determineScoreGroup(currentWeek, numberWeeks);
  const currentWeights = weightedSums[weightsIndex];
  const val = Math.random() * 100;
  for (let i = 0; i < currentWeights.length; i++)
    if (val <= currentWeights[i]) return i;
  return currentWeights.length - 1;
};

// determine which set of weights to use for scores
const determineScoreGroup = (currentWeek: number, numberWeeks: number) => {
  const val = currentWeek / numberWeeks;
  const numberGroups = weightedSums.length;
  for (let i = 0; i < numberGroups; i++)
    if (val <= (i + 1) / numberGroups) return i;
  return numberGroups - 1;
};

// calculate cumulative score among all dances
const cumulativeScore = (dances: Dance[]) =>
  dances.reduce((sum, item) => sum + totalScore(item.scores), 0);
