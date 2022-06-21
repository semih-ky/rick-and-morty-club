import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
  Center,
  VStack,
  Image,
  Box,
  Input,
  IconButton,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { RickAndMorty } from './List';
import { v4 as uuidv4 } from 'uuid';

type onChangeEvent = React.ChangeEvent<HTMLInputElement>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  addNewChar: (entries: RickAndMorty) => void;
};

const AddCharModal: React.FC<Props> = ({ isOpen, onClose, addNewChar }) => {

  // Input fields states
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [imgSrc, setImgSrc] = useState<string>('');
  // ------------------

  // Input "file" element, opens file browser
  const fileRef = useRef<HTMLInputElement>(null);
  // ------------------

  const [errorMsg, setErrorMsg] = useState('');


  // Input change handlers
  const nameHandler = (e: onChangeEvent) => {
    setName(e.target.value);
  };

  const locationHandler = (e: onChangeEvent) => {
    setLocation(e.target.value);
  };


  // File Handler - Read the file and export as URL and give that into "<img />" src attribute
  const fileHandler = (e: onChangeEvent) => {
    const file = e.target.files && e.target.files[0];

    const fileReader = new FileReader();
    fileReader.onload = function () {
      if (fileReader.result) {
        setImgSrc(fileReader.result?.toString());
      }
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  // Add New Character to "list" state in "<Home />" and clear fields
  const addHandler = () => {
    if (!name || !location || !imgSrc) {
      setErrorMsg('All fields are required!');
      return;
    }

    addNewChar({
      id: uuidv4(),
      image: imgSrc,
      name,
      location: {
        id: uuidv4(),
        name: location,
      },
    });
    onClose();
    setName('');
    setLocation('');
    setImgSrc('');
    setErrorMsg('');
  };

  // Every modal open/close clear error message
  useEffect(() => {
    setErrorMsg('');
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Character</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <VStack>
            <Center>
              <Box
                position={'relative'}
                h={'150px'}
                w={'150px'}
                overflow={'hidden'}
                borderRadius="lg"
              >
                <Image
                  src={imgSrc}
                  alt="New Character"
                  fallbackSrc="https://via.placeholder.com/150"
                />
                <Input
                  ref={fileRef}
                  onChange={fileHandler}
                  type={'file'}
                  display={'none'}
                />
                <IconButton
                  onClick={() => fileRef.current?.click()}
                  size={'sm'}
                  borderRadius={'2xl'}
                  sx={{
                    position: 'absolute',
                    right: '2',
                    bottom: '2',
                  }}
                  colorScheme="teal"
                  aria-label="Add Image"
                  icon={<MdEdit />}
                />
              </Box>
            </Center>
            <Divider />
            <Input placeholder="Name" value={name} onChange={nameHandler} />
            <Input
              placeholder="Location"
              value={location}
              onChange={locationHandler}
            />
            {errorMsg && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>{errorMsg}</AlertTitle>
              </Alert>
            )}
          </VStack>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={addHandler}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCharModal;
