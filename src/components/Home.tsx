import { gql, useQuery } from '@apollo/client';
import { useState, useRef, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import List, { RickAndMorty } from './List';
import FilterModal, { FilterName } from './FilterModal';
import AddCharModal from './AddCharModal';
import CharacterModal from './CharacterModal';
import { useSelectCharId } from '../context/SelectCharProvider';

export const GET_RICKS_MORTYS = gql`
  query GetRicksMortys($pageNo: Int, $filter: FilterCharacter) {
    characters(page: $pageNo, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        location {
          id
          name
        }
        image
      }
    }
  }
`;

const Home: React.FC = () => {

  // A list that contain data(results) from comes to graphql 
  const [list, setList] = useState<RickAndMorty[]>([]);
  // ------------------
  
  // Current page number
  const [page, setPage] = useState(1);
  // ------------------


  // Contains number about how many page exists
  const [pageCount, setPageCount] = useState(0);
  // ------------------

  const [filter, setFilter] = useState<FilterName>('');

  // Prevents call "observer" more than one
  const [oneTimeSetObs, setOneTimeSetObs] = useState(false);
  // ------------------
  
  // Observer target
  const obsRef = useRef<HTMLDivElement>(null);
  // ------------------


  // Modals open/close trigger
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // ------------------

  const selectCharCtx = useSelectCharId();

  // GraphQL Query
  const { data, error, loading } = useQuery(GET_RICKS_MORTYS, {
    variables: {
      pageNo: page,
      filter: {
        name: filter,
      },
    },
  });

  // Adds data which comes from query to "list", and sets how many page are there
  // Why "useEffect": Because of apollo cache-policy,
  // "onCompleted" method from "useQuery" caused bug when query first look at cache
  useEffect(() => {
    if (data) {
      setList([...list, ...data?.characters?.results]);
      setPageCount(data?.characters?.info?.pages);
    }
  }, [data]);


  // Infinite Scrool - Used IntersectionObserver API
  // If target(obsRef.current) enter the specified viewport, 
  // the page number icrease and request sends automatically to graphql
  const observerHandler = (entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const observer = useMemo(() => {
    return new IntersectionObserver(observerHandler, {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    });
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      if (!oneTimeSetObs) {
        if (obsRef.current) {
          observer.observe(obsRef.current);
          setOneTimeSetObs(true);
        }
      }
    } else {
      observer.disconnect();
      setOneTimeSetObs(false);
    }
  }, [list]);

  // When there is not page to load, 
  // clears observer and no more request sent
  useEffect(() => {
    if (page === 0) return;
    if (page === pageCount) {
      observer.disconnect();
    }
  }, [page]);
  // -----------------------------------------


  // Modals open/close triggers
  const filterHandler = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  const addModalHandler = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };
  // ------------------


  // Add new character to the top of the list
  const addNewChar = (newChar: RickAndMorty) => {
    setList([newChar, ...list]);
  };

  const changeFilter = (name: FilterName) => {
    setList([]);
    setPage(1);
    setFilter(name);
  };

  if (error) {
    if (error) console.log('Apollo Error:', error);
    return (
      <Box w={'100vw'} h={'100vh'}>
        <Center w={'full'} h={'full'} flexDirection={'column'}>
          <Text as={'h1'} color={'red'} fontSize={'2xl'}>
            Error Occured
          </Text>
          <Text>Something went wrong! Look console.</Text>
        </Center>
      </Box>
    );
  }

  return (
    <Container maxW={'container.lg'} mt={'40'} pb={'16'}>
      <Flex justifyContent="space-between" flexWrap={'wrap'} gap="4">
        <Box>
          <Button onClick={filterHandler} rightIcon={<Icon as={FaFilter} />}>
            {filter
              ? filter.charAt(0).toUpperCase() + filter.slice(1)
              : 'Rick and Morty'}
          </Button>
        </Box>
        <Box>
          <Button onClick={addModalHandler}>Add New Character</Button>
        </Box>
      </Flex>

      {/* -------- DATA DISPLAY -------- */}
      <Box mt={'16'}>
        <List isLoading={loading} results={list} />
        {list.length > 0 && <Box ref={obsRef}></Box>}
      </Box>
      {/* -------- DATA DISPLAY -------- */}
      


      {/* -------- MODAL COMPONENTS -------- */}
      <FilterModal
        isOpen={isOpenFilter}
        onClose={filterHandler}
        changeFilter={changeFilter}
      />
      <AddCharModal
        isOpen={isAddModalOpen}
        onClose={addModalHandler}
        addNewChar={addNewChar}
      />
      <CharacterModal
        isOpen={selectCharCtx.isOpen}
        onClose={selectCharCtx.modalHandler}
        id={selectCharCtx.selectedCharId}
      />
      {/* -------- MODAL COMPONENTS -------- */}

    </Container>
  );
};

export default Home;
