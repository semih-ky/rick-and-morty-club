import { GET_CHARACTER } from './CharacterModal';
import { GET_RICKS_MORTYS } from './Home';

export const GET_CHARS = {
  request: {
    query: GET_RICKS_MORTYS,
    variables: {
      pageNo: 1,
      filter: {
        name: '',
      },
    },
  },
  result: {
    data: {
      characters: {
        info: {
          count: 826,
          pages: 42,
          next: 2,
          prev: null,
        },
        results: [
          {
            id: '1',
            name: 'Rick Sanchez',
            location: {
              id: '3',
              name: 'Citadel of Ricks',
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          },
          {
            id: '2',
            name: 'Morty Smith',
            location: {
              id: '3',
              name: 'Citadel of Ricks',
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          },
        ],
      },
    },
  },
};

export const GET_CHARS_ERROR = {
  request: {
    query: GET_RICKS_MORTYS,
    variables: {
      pageNo: 1,
      filter: {
        name: '',
      },
    },
  },
  error: new Error('An error occured!'),
};

export const GET_CHAR = {
  request: {
    query: GET_CHARACTER,
    variables: {
      id: 1,
    },
  },
  result: {
    data: {
      character: {
        id: 1,
        name: 'rick',
        status: 'live',
        species: 'unknown',
        gender: 'male',
        location: {
          name: 'tr',
          type: 'earth',
          dimension: '1',
        },
        image: 'asd',
        episode: [{
          id: 1,
          name: 'Plot',
          episode: 'S0E01',
        }],
      },
    },
  },
};
