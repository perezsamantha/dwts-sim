import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { Team } from '../store/interfaces';
import CastImage from './castImage';
import { getOrdinalNumber, teamIdShuffle } from '../lib/logic';
import Champion from './champion';

export default function FinalePlacements(props: {
  cast: Team[];
  placements: number[];
}) {
  const { cast, placements } = props;
  const final2Shuffled = teamIdShuffle(
    [...placements].slice(placements.length - 2)
  );

  const getTeamName = (id: number) =>
    `${cast[id].teamMembers[0].firstName} & ${cast[id].teamMembers[1].firstName}`;

  return (
    <Box
      minWidth="300px"
      maxWidth="500px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      gap={2}
    >
      <Text>Finale Placements</Text>
      {placements.map(
        (id, i) =>
          i < placements.length - 2 && (
            <Box key={id} width="100%" mb={2}>
              <Text>
                The team in {getOrdinalNumber(cast[id].placement)} place is...
              </Text>
              <Flex flexDirection="row" my={1}>
                <Box width="100%" mr={2}>
                  <CastImage data={cast[id].teamMembers[0]} elim={true} />
                </Box>{' '}
                <Box width="100%">
                  <CastImage data={cast[id].teamMembers[1]} elim={true} />
                </Box>
              </Flex>
              <Text>{getTeamName(id)}</Text>
            </Box>
          )
      )}
      <Text fontSize="xl">Final 2</Text>
      <HStack width="100%">
        <Flex flexDirection="row" my={1} width="50%">
          <Box width="100%" mr={2}>
            <CastImage
              data={cast[final2Shuffled[0]].teamMembers[0]}
              elim={false}
            />
          </Box>{' '}
          <Box width="100%">
            <CastImage
              data={cast[final2Shuffled[0]].teamMembers[1]}
              elim={false}
            />
          </Box>
        </Flex>
        <Flex flexDirection="row" my={1} width="50%">
          <Box width="100%" mr={2}>
            <CastImage
              data={cast[final2Shuffled[1]].teamMembers[0]}
              elim={false}
            />
          </Box>{' '}
          <Box width="100%">
            <CastImage
              data={cast[final2Shuffled[1]].teamMembers[1]}
              elim={false}
            />
          </Box>
        </Flex>
      </HStack>
      <Text>{getTeamName(final2Shuffled[0])}</Text>
      <Text>{getTeamName(final2Shuffled[1])}</Text>
      <Text>... the winners and new champions</Text>
      <Text>of Dancing with the Stars are ...</Text>

      <Champion team={cast[placements[placements.length - 1]]} />
    </Box>
  );
}
