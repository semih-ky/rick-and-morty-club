import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Radio,
  Stack,
  Divider,
} from '@chakra-ui/react';
import { useState } from 'react';

export type FilterName = 'rick' | 'morty' | '';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  changeFilter: (name: FilterName) => void;
};

const FilterModal: React.FC<Props> = ({ isOpen, onClose, changeFilter }) => {
  const [value, setValue] = useState<FilterName>('');

  const onChange = (value: FilterName) => {
    setValue(value);
    changeFilter(value);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <RadioGroup onChange={onChange} value={value} mb={'4'} >
            <Stack direction="column">
              <Radio value="rick">Rick</Radio>
              <Radio value="morty">Morty</Radio>
            </Stack>
          </RadioGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
