'use client';
import { useEffect, useRef, useState } from 'react';
import { useBoundStore } from '../store/useStore';
import { Dance } from '../store/interfaces';
import { useRouter } from 'next/navigation';
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Header from '../ui/header';
import { calculateAverage, sortByPlacement, totalScore } from '../lib/logic';
import Loading from '../ui/loading';
import HomeButton from '../ui/homeButton';

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
        <p>{dance.style}</p>
        <p>{totalScore(dance.scores)}</p>
      </>
    );
  }

  return loading ? (
    <Loading />
  ) : (
    <Box display="flex" flexDirection="column" alignItems="center" padding={8}>
      <Header type="summary" week={numberWeeks} />
      <h1>Sim Summary</h1>
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
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
                <Td>
                  {team.teamMembers[0].firstName} &{' '}
                  {team.teamMembers[1].firstName}
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
