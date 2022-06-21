import { Grid, GridItem, Skeleton } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import ListItem from './ListItem';

interface Location {
  id: string;
  name: string;
}

export interface RickAndMorty {
  id: string;
  name: string;
  image: string;
  location: Location;
}

type RickAndMortyList = {
  results: RickAndMorty[];
  isLoading: boolean;
};

const SIZE_OF_RESULTS: number = 20;
const SKELETON_COUNT: number = SIZE_OF_RESULTS;
const SKELETON_ARR: number[] = new Array(SKELETON_COUNT).fill(0);

const List: React.FC<RickAndMortyList> = ({ results, isLoading }) => {
  return (
    <Grid
      templateColumns={'repeat(auto-fit, minmax(0, 480px))'}
      gap={'8'}
      justifyContent={'center'}
    >
      {results.map((item) => (
        <GridItem key={uuidv4()}>
          <ListItem
            imgSrc={item.image}
            id={item.id}
            name={item.name}
            location={item.location.name}
          />
        </GridItem>
      ))}
      {isLoading &&
        SKELETON_ARR.map(() => (
          <GridItem key={uuidv4()}>
            <Skeleton data-testid="skeleton" height={'150px'} />
          </GridItem>
        ))}
    </Grid>
  );
};

export default List;
