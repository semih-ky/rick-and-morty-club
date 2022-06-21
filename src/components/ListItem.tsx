import {
  Box,
  Flex,
  Image,
} from '@chakra-ui/react';
import { useSelectCharId } from '../context/SelectCharProvider';
import InfoText from './InfoText';

type Props = {
  imgSrc: string;
  id: string;
  name: string;
  location: string;
};

const ListItem: React.FC<Props> = ({ imgSrc, id, name, location }) => {
  const { selectCharId, modalHandler } = useSelectCharId();

  const setCharId = (e: React.MouseEvent<HTMLDivElement>) => {
    selectCharId(e.currentTarget.id);
    modalHandler();
  }

  return (
    <Box
      data-testid='list-item'
      onClick={setCharId}
      id={id}
      boxShadow={'lg'}
      borderRadius="lg"
      height="150px"
      p={'0'}
      overflow="hidden"
      cursor={'pointer'}
      _hover={{
        transform: 'scale(1.05)',
      }}
    >
      <Flex height={'full'} gap="2">
        <Box maxW="150px" minW="150px" h="full">
          <Image
            loading={'lazy'}
            src={imgSrc}
            alt={name}
            fallbackSrc="https://via.placeholder.com/150"
          />
        </Box>
        <Box flexGrow={'1'} fontSize={'14px'}>
          <Flex
            h={'full'}
            direction={'column'}
            justifyContent={'space-between'}
            p={'2'}
          >
            <Box>
              <InfoText label="#ID" value={id} />
            </Box>
            <Box>
              <InfoText label="Name" value={name} />
              <InfoText label="Location" value={location} />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default ListItem;
