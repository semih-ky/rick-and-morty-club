import { Text } from '@chakra-ui/react';

const InfoText: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <Text>
      {label}:{' '}
      <Text color={'gray.500'} as={'span'}>
        {value}
      </Text>
    </Text>
  );
};

export default InfoText;
