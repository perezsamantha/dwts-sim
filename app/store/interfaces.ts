interface Celeb {
  id: string;
  firstname: string;
  lastname: string;
  image: string;
  gender: string;
  season: string;
  placement: string;
}

interface Pro {
  id: string;
  firstname: string;
  lastname: string;
  image: string;
  gender: string;
  current: string;
}

interface Team {
  teamMembers: Dancer[];
  placement: number;
  dances: Dance[];
  styles: string[];
}

interface Dancer {
  firstname: string;
  lastname: string;
  image: string;
  type: string;
  dataId: string;
}

interface Song {
  title: string;
  artist: string;
  style: string;
  uri?: string;
}

interface Dance {
  teamId: number;
  teamIds?: number[];
  week: number;
  title: string;
  artist: string;
  style: string;
  scores: number[];
  uri?: string;
}

export { type Celeb, type Pro, type Team, type Dancer, type Song, type Dance };
