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

interface Team {
  teamMembers: Dancer[];
  placement: number;
  dances: Dance[];
  styles: string[];
}

interface Dancer {
  firstName: string;
  lastName: string;
  image: string;
  type: string;
  dataIndex: number;
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
