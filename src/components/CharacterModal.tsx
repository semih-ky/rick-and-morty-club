import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
  Center,
  VStack,
  Image,
  Box,
  Spinner,
  Text,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import InfoText from './InfoText';

export const GET_CHARACTER = gql`
  query getChar($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      location {
        name
        type
        dimension
      }
      image
      episode {
        id
        name
        episode
      }
    }
  }
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: string | number;
};

const CharacterModal: React.FC<Props> = ({ isOpen, onClose, id }) => {
  const [getChar, { data, loading, error }] = useLazyQuery(GET_CHARACTER, {
    variables: { id },
  });

  // Only send request if "id" exists or changes
  useEffect(() => {
    if (id) {
      getChar();
    }
  }, [id]);

  if (error) console.log(error);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent data-testid="character-info-modal" >
        <ModalHeader>
          {data ? data.character.name : 'Rick and Morty'}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <VStack display={'block'} pb={'8'}>
            {data && (
              <>
                {/* -------- CHARACTER IMAGE -------- */}
                <Center>
                  <Box
                    position={'relative'}
                    h={'150px'}
                    w={'150px'}
                    overflow={'hidden'}
                    borderRadius="lg"
                  >
                    <Image
                      src={data.character.image}
                      alt={data.character.name}
                      fallbackSrc="https://via.placeholder.com/150"
                    />
                    <Link
                      target={'_blank'}
                      href={data.character.image}
                      sx={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        opacity: '0',
                        cursor: 'pointer',
                      }}
                    />
                  </Box>
                </Center>
                {/* -------- CHARACTER IMAGE -------- */}

                <Divider />

                {/* -------- INFORMATION ABOUT THE CHARACTER -------- */}

                <InfoText label="#ID" value={data.character.id} />
                <InfoText label="Name" value={data.character.name} />
                <InfoText label="Status" value={data.character.status} />
                <InfoText label="Species" value={data.character.species} />
                <InfoText label="Gender" value={data.character.gender} />
                <InfoText
                  label="Location"
                  value={data.character.location.name}
                />
                {/* -------- INFORMATION ABOUT THE CHARACTER -------- */}

                {/* -------- EPISODES -------- */}
                <Accordion allowMultiple mt={'16'}>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          <Text ml={'-16px'}>Episodes</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      pb={4}
                      fontSize={'sm'}
                      height={'120px'}
                      overflow="auto"
                    >
                      {data.character.episode.map((item: any) => (
                        <InfoText
                          key={item.id}
                          label={item.episode}
                          value={item.name}
                        />
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                {/* -------- EPISODES -------- */}
              </>
            )}
            {loading && (
              <Box h={'150px'}>
                <Center>
                  <Spinner />
                </Center>
              </Box>
            )}
            {error && (
              <Text color={'red'}>Something went wrong! Look at console.</Text>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CharacterModal;
