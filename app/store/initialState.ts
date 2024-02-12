import { shuffleStyles, sortMusic } from '../lib/logic';

export const initialJudges = [
  'Carrie Ann Inaba',
  'Derek Hough',
  'Bruno Tonioli',
];

export const initialSim = {
  currentWeek: 0,
  currentDance: 0,
  currentRunningOrder: [],
  weeks: [],
  //music: sortMusic(),
  //music: {},
  eliminated: [],
};

export const initialCast = [
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Xochitl',
        lastname: 'Gomez',
        image: '/images/32/xochitl.jpg',
        type: 'celeb',
        dataIndex: 0,
      },
      {
        firstname: 'Val',
        lastname: 'Chmerkovskiy',
        image: '/images/pros/val.jpg',
        type: 'pro',
        dataIndex: 14,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Jason',
        lastname: 'Mraz',
        image: '/images/32/jason.jpg',
        type: 'celeb',
        dataIndex: 1,
      },
      {
        firstname: 'Daniella',
        lastname: 'Karagach',
        image: '/images/pros/daniella.jpg',
        type: 'pro',
        dataIndex: 4,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Ariana',
        lastname: 'Madix',
        image: '/images/32/ariana.jpg',
        type: 'celeb',
        dataIndex: 2,
      },
      {
        firstname: 'Pasha',
        lastname: 'Pashkov',
        image: '/images/pros/pasha.jpg',
        type: 'pro',
        dataIndex: 10,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Charity',
        lastname: 'Lawson',
        image: '/images/32/charity.jpg',
        type: 'celeb',
        dataIndex: 3,
      },
      {
        firstname: 'Artem',
        lastname: 'Chigvintsev',
        image: '/images/pros/artem.jpg',
        type: 'pro',
        dataIndex: 1,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Alyson',
        lastname: 'Hannigan',
        image: '/images/32/alyson.jpg',
        type: 'celeb',
        dataIndex: 4,
      },
      {
        firstname: 'Sasha',
        lastname: 'Farber',
        image: '/images/pros/sasha.jpg',
        type: 'pro',
        dataIndex: 13,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Harry',
        lastname: 'Jowsey',
        image: '/images/32/harry.jpg',
        type: 'celeb',
        dataIndex: 5,
      },
      {
        firstname: 'Rylee',
        lastname: 'Arnold',
        image: '/images/pros/rylee.jpg',
        type: 'pro',
        dataIndex: 12,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Barry',
        lastname: 'Williams',
        image: '/images/32/barry.jpg',
        type: 'celeb',
        dataIndex: 6,
      },
      {
        firstname: 'Peta',
        lastname: 'Murgatroyd',
        image: '/images/pros/peta.jpg',
        type: 'pro',
        dataIndex: 11,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Lele',
        lastname: 'Pons',
        image: '/images/32/lele.jpg',
        type: 'celeb',
        dataIndex: 7,
      },
      {
        firstname: 'Brandon',
        lastname: 'Armstrong',
        image: '/images/pros/brandon.jpg',
        type: 'pro',
        dataIndex: 2,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Mauricio',
        lastname: 'Umansky',
        image: '/images/32/mauricio.jpg',
        type: 'celeb',
        dataIndex: 8,
      },
      {
        firstname: 'Emma',
        lastname: 'Slater',
        image: '/images/pros/emma.jpg',
        type: 'pro',
        dataIndex: 5,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Mira',
        lastname: 'Sorvino',
        image: '/images/32/mira.jpg',
        type: 'celeb',
        dataIndex: 9,
      },
      {
        firstname: 'Gleb',
        lastname: 'Savchenko',
        image: '/images/pros/gleb.jpg',
        type: 'pro',
        dataIndex: 7,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Adrian',
        lastname: 'Peterson',
        image: '/images/32/adrian.jpg',
        type: 'celeb',
        dataIndex: 10,
      },
      {
        firstname: 'Britt',
        lastname: 'Stewart',
        image: '/images/pros/britt.jpg',
        type: 'pro',
        dataIndex: 3,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Tyson',
        lastname: 'Beckford',
        image: '/images/32/tyson.jpg',
        type: 'celeb',
        dataIndex: 11,
      },
      {
        firstname: 'Jenna',
        lastname: 'Johnson',
        image: '/images/pros/jenna.jpg',
        type: 'pro',
        dataIndex: 8,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Jamie Lynn',
        lastname: 'Spears',
        image: '/images/32/jamielynn.jpg',
        type: 'celeb',
        dataIndex: 12,
      },
      {
        firstname: 'Alan',
        lastname: 'Bersten',
        image: '/images/pros/alan.jpg',
        type: 'pro',
        dataIndex: 0,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Matt',
        lastname: 'Walsh',
        image: '/images/32/matt.jpg',
        type: 'celeb',
        dataIndex: 13,
      },
      {
        firstname: 'Koko',
        lastname: 'Iwasaki',
        image: '/images/pros/koko.jpg',
        type: 'pro',
        dataIndex: 9,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
];
