interface Song {
  Title: string;
  Artist: string;
  Style: string;
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

// reduce/sort music data by style
export const sortMusic = <T, K extends keyof any>(
  list: T[],
  getKey: (item: T) => K
) =>
  list.reduce(
    (previous, currentItem) => {
      const group = getKey(currentItem);
      if (!previous[group]) previous[group] = [];
      previous[group].push(currentItem);
      return previous;
    },
    {} as Record<K, T[]>
  );

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

//determine if double elim

// randomize songs/styles
