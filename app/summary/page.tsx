'use client';
import { useEffect, useRef, useState } from 'react';
import { useBoundStore } from '../store/useStore';
import { Dance } from '../store/interfaces';
import { useRouter } from 'next/navigation';
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Header from '../ui/header';
import { calculateAverage, sortByPlacement, totalScore } from '../lib/logic';
import Loading from '../ui/loading';
import HomeButton from '../ui/homeButton';
import AvatarImage from '../ui/avatarImage';

export default function Summary() {
  const router = useRouter();
  const effectRan = useRef(false);
  const [loading, setLoading] = useState(true);
  const { cast, currentWeek, numberWeeks } = useBoundStore((state) => state);
  const sortedCast = sortByPlacement([...cast]);

  useEffect(() => {
    if (!effectRan.current) {
      if (currentWeek < numberWeeks) router.push('/fallback');
      else setLoading(false);
    }
    effectRan.current = true;
  }, [currentWeek, router, numberWeeks]);

  function DancePreview(dance: Dance) {
    return (
      <>
        <Text>{dance.style}</Text>
        <Text>{totalScore(dance.scores)}</Text>
      </>
    );
  }

  return loading ? (
    <Loading />
  ) : (
    <Box display="flex" flexDirection="column" alignItems="center" padding={4}>
      <Header type="summary" week={numberWeeks} />
      <Heading as="h1" size="xl">
        Sim Summary
      </Heading>
      <TableContainer
        sx={{
          '::-webkit-scrollbar': {
            //display: 'none',
          },
        }}
      >
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Team</Th>
              <Th>Average</Th>
              {Array.from({ length: numberWeeks }, (_, i) => i + 1).map(
                (week) => (
                  <Th key={week}>Week {week}</Th>
                )
              )}
            </Tr>
          </Thead>
          <Tbody>
            {sortedCast.map((team, i) => (
              <Tr key={i}>
                <Td>{team.placement}</Td>
                <Td>
                  <Flex flexDirection="row" alignItems="center">
                    <Box
                      width="100%"
                      minWidth="125px"
                      maxWidth="125px"
                      position="relative"
                      display="flex"
                      flexDirection="row"
                    >
                      <AspectRatio ratio={1} width="100%" zIndex="-1">
                        <AvatarImage dancer={team.teamMembers[0]} />
                      </AspectRatio>
                      <AspectRatio ratio={1} width="100%" zIndex="-2" right={3}>
                        <AvatarImage dancer={team.teamMembers[1]} />
                      </AspectRatio>
                    </Box>
                    <Text>
                      {team.teamMembers[0].firstName} &{' '}
                      {team.teamMembers[1].firstName}
                    </Text>
                  </Flex>
                </Td>
                <Td>{calculateAverage(team.dances)}</Td>
                {team.dances.map((dance, i) => {
                  if (
                    i + 1 < team.dances.length &&
                    team.dances[i + 1].week === dance.week
                  ) {
                    return (
                      <Td key={i}>
                        <DancePreview {...dance} />
                        <DancePreview {...team.dances[i + 1]} />
                      </Td>
                    );
                  } else if (i > 0 && team.dances[i - 1].week === dance.week)
                    return;
                  else
                    return (
                      <Td key={i}>
                        <DancePreview {...dance} />
                      </Td>
                    );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HomeButton />
    </Box>
  );
}
