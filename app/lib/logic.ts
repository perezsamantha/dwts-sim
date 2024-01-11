interface Song {
  Title: string;
  Artist: string;
  Style: string;
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

//determine if double elim

// randomize songs/styles
