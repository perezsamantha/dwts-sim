import { Box, Text } from '@chakra-ui/react';
import { Team } from '../store/interfaces';
import { getOrdinalNumber } from '../lib/logic';
import ElimPreview from './elimPreview';

export default function ElimWrapper(props: {
  cast: Team[];
  elimIds: number[];
}) {
  const { cast, elimIds } = props;

  return elimIds.length === 0 ? (
    <Text fontSize="xl">No elimination!</Text>
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      minWidth="300px"
      justifyContent="center"
    >
      {elimIds.length > 1 ? (
        <Text fontSize="xl">Double elimination night!</Text>
      ) : (
        <Text fontSize="xl">Elimination</Text>
      )}
      <Text>
        The team{elimIds.length > 1 && 's'} in{' '}
        {getOrdinalNumber(cast[elimIds[0]].placement)} place{' '}
        {elimIds.length > 1 ? 'are' : 'is'} ...
      </Text>

      {elimIds.map((id) => (
        <ElimPreview key={id} team={cast[id]} />
      ))}
    </Box>
  );
}
