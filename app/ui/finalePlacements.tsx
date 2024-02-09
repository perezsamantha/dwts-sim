import { Box, Text } from '@chakra-ui/react';
import { Team } from '../store/interfaces';
import { getOrdinalNumber } from '../lib/logic';
import ElimPreview from './elimPreview';

export default function FinalePlacements(props: {
  cast: Team[];
  placements: number[];
}) {
  const { cast, placements } = props;

  return (
    <Box
      minWidth="300px"
      maxWidth="500px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      gap={2}
    >
      <Text fontSize="lg">Finale Placements</Text>
      {placements.map(
        (id, i) =>
          i < placements.length - 2 && (
            <Box key={id} width="100%" mb={2}>
              <Text my={2}>
                The team in {getOrdinalNumber(cast[id].placement)} place is...
              </Text>
              <ElimPreview team={cast[id]} />
            </Box>
          )
      )}
    </Box>
  );
}
