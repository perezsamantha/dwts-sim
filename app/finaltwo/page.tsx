'use client';
import { useEffect, useRef, useState } from 'react';
import { useBoundStore } from '../store/useStore';
import { useRouter } from 'next/navigation';
import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import Header from '../ui/header';
import Loading from '../ui/loading';
import { teamIdShuffle } from '../lib/logic';
import CastImage from '../ui/castImage';
import Champion from '../ui/champion';
import SummaryButton from '../ui/summaryButton';

export default function FinalTwo() {
  const router = useRouter();
  const effectRan = useRef(false);
  const [loading, setLoading] = useState(true);
  const { cast, currentWeek, numberWeeks, eliminated } = useBoundStore(
    (state) => state
  );

  const placements = eliminated[eliminated.length - 1];
  const [final2, setFinal2] = useState(new Array<number>());

  const getTeamName = (id: number) =>
    `${cast[id].teamMembers[0].firstname} & ${cast[id].teamMembers[1].firstname}`;

  useEffect(() => {
    if (!effectRan.current) {
      if (currentWeek < numberWeeks) router.push('/fallback');
      else {
        setFinal2(teamIdShuffle(placements.slice(placements.length - 2)));
        setLoading(false);
      }
    }
    effectRan.current = true;
  }, [currentWeek, router, numberWeeks, placements]);

  return loading ? (
    <Loading />
  ) : (
    <Box display="flex" flexDirection="column" alignItems="center" padding={4}>
      <Header type="summary" week={numberWeeks} />
      <Heading as="h1" size="xl">
        Final 2
      </Heading>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        alignContent="center"
        width={['100%', '80%', '55%', '40%']}
        gap={4}
      >
        <Flex width="100%" gap={2}>
          <Box width="49%" textAlign="center">
            <Flex flexDirection="row" my={2}>
              <Box width="100%" mr={2}>
                <CastImage data={cast[final2[0]].teamMembers[0]} elim={false} />
              </Box>{' '}
              <Box width="100%">
                <CastImage data={cast[final2[0]].teamMembers[1]} elim={false} />
              </Box>
            </Flex>
            <Text>{getTeamName(final2[0])}</Text>
          </Box>
          <Spacer />
          <Box width="49%" textAlign="center">
            <Flex flexDirection="row" my={2}>
              <Box width="100%" mr={2}>
                <CastImage data={cast[final2[1]].teamMembers[0]} elim={false} />
              </Box>{' '}
              <Box width="100%">
                <CastImage data={cast[final2[1]].teamMembers[1]} elim={false} />
              </Box>
            </Flex>
            <Text>{getTeamName(final2[1])}</Text>
          </Box>
        </Flex>
        <Box textAlign="center">
          <Text fontSize="lg">The winners and new champions</Text>
          <Text fontSize="lg">of Dancing with the Stars are ...</Text>
        </Box>

        <Champion team={cast[placements[placements.length - 1]]} />
        <SummaryButton />
      </Box>
    </Box>
  );
}
