import { Box, Flex, Text } from '@chakra-ui/react';
import { Team } from '../store/interfaces';
import CastImage from './castImage';

export default function ElimPreview(props: {
  cast: Team[];
  elimIds: number[];
}) {
  const { cast, elimIds } = props;

  return elimIds.length === 0 ? (
    <Text fontSize="xl">No elimination!</Text>
  ) : (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      {elimIds.length > 1 && (
        <Text fontSize="xl">Double elimination night!</Text>
      )}
      <Text>
        The team{elimIds.length > 1 && 's'} going home{' '}
        {elimIds.length > 1 ? 'are' : 'is'} ...
      </Text>
      {elimIds.map((id) => (
        <Box key={id} width="100%" mb={2}>
          <Flex flexDirection="row" my={1}>
            <Box width="100%" mr={2}>
              <CastImage data={cast[id].teamMembers[0]} elim={true} />
            </Box>{' '}
            <Box width="100%">
              <CastImage data={cast[id].teamMembers[1]} elim={true} />
            </Box>
          </Flex>
          <Text align="center">
            {cast[id].teamMembers[0].firstName} &{' '}
            {cast[id].teamMembers[1].firstName}{' '}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
