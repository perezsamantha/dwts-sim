'use client';
import {
  Box,
  Flex,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useColorMode,
} from '@chakra-ui/react';
import { useBoundStore } from '../store/useStore';
import { Dance } from '../store/interfaces';
import CastImage from './castImage';
import { totalScore } from '../lib/logic';
import SongPreview from './songPreview';

export default function Dance(props: { dance: Dance }) {
  const judges = useBoundStore((state) => state.judges);

  const dance = props.dance;
  const scores = dance.scores;

  const { colorMode } = useColorMode();

  const lightModeShadow = '0 0 50px -25px rgba(0, 0, 0, 0.25)';
  // const darkModeShadow =
  //   'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px';
  const darkModeShadow =
    'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 0px 10px,rgba(0, 0, 0, 0.5) 0px 0 50px -15px';

  const OneTeam = () => {
    const celeb = useBoundStore(
      (state) => state.cast[props.dance.teamId].teamMembers[0]
    );
    const pro = useBoundStore(
      (state) => state.cast[props.dance.teamId].teamMembers[1]
    );
    return (
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Flex flexDirection="row" minWidth="250px" maxWidth="500px">
          <Box width="100%" mr={2}>
            <CastImage data={celeb} elim={false} />
          </Box>
          <Box width="100%">
            <CastImage data={pro} elim={false} />
          </Box>
        </Flex>
        <Text margin={1}>
          {celeb.firstName} & {pro.firstName}
        </Text>
      </Box>
    );
  };

  const MultipleTeams = () => {
    const cast = useBoundStore((state) => state.cast);
    return (
      <SimpleGrid columns={2} spacing={[2, null, 4]}>
        {dance.teamIds?.map((id) => (
          <Box
            key={id}
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            <Flex
              flexDirection="row"
              minWidth={['125px', '175px', '200px', '225px']}
            >
              <Box width="100%" mr={2}>
                <CastImage data={cast[id].teamMembers[0]} elim={false} />
              </Box>
              <Box width="100%">
                <CastImage data={cast[id].teamMembers[1]} elim={false} />
              </Box>
            </Flex>
            <Text margin={1}>
              {cast[id].teamMembers[0].firstName} &{' '}
              {cast[id].teamMembers[1].firstName}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    );
  };

  return (
    <Box
      width="95%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      alignContent="center"
      rounded="lg"
      my={4}
      maxWidth="500px"
      py={5}
      px={2}
      boxShadow={colorMode === 'dark' ? darkModeShadow : lightModeShadow}
      bg={colorMode === 'dark' ? 'blackalpha.50' : 'whitealpha.900'}
    >
      {dance.teamIds ? <MultipleTeams /> : <OneTeam />}
      <Text margin={1}>{dance.style}</Text>
      <Text margin={1}>to</Text>
      <Text margin={1} align="center">
        &#34;{dance.title}&#34; by {dance.artist}
      </Text>
      <Text margin={1}>Scores </Text>{' '}
      <Table variant="simple" size="md">
        <Tbody>
          <Tr>
            {judges.map((judge, i) => (
              <Td key={i} border="none" px={0} py={2} width={1 / 3}>
                <Text align="center">{judge}</Text>
              </Td>
            ))}
          </Tr>
          <Tr>
            {scores.map((score, i) => (
              <Td key={i} border="none" px={0} py={2} width={1 / 3}>
                <Text align="center">{score}</Text>
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
      <Text as="b">Total</Text>
      <Text>{totalScore(scores)}</Text>
      {dance.uri && <SongPreview uri={dance.uri} />}
    </Box>
  );
}
