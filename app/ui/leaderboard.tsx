'use client';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Avatar,
  Flex,
  AvatarGroup,
} from '@chakra-ui/react';
import { totalScore } from '@/app/lib/logic';
import { Dance, Team } from '../store/interfaces';

export default function Leaderboard(props: {
  cast: Team[];
  dances: { [teamId: string]: Dance[] };
  ids: string[];
}) {
  const double = props.dances[props.ids[0]].length === 2;
  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Team</Th>
            <Th>Score</Th>
            <Th>Style{double && 's'}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.ids.map((id, i) => {
            const index = Number(id);
            const celeb = props.cast[index].teamMembers[0];
            const pro = props.cast[index].teamMembers[1];
            const dances = props.dances[id];
            let scores = 0;
            for (let i = 0; i < dances.length; i++)
              scores += totalScore(dances[i].scores);
            return (
              <Tr key={i}>
                <Td>
                  <Flex direction="row" alignItems="center">
                    <AvatarGroup>
                      <Avatar
                        name={`${celeb.firstName}`}
                        src={
                          celeb.image
                            ? `/images${celeb.image}.jpg`
                            : '/images/mirrorball.png'
                        }
                      />
                      <Avatar
                        name={`${pro.firstName}`}
                        src={
                          pro.image
                            ? `/images${pro.image}.jpg`
                            : '/images/mirrorball.png'
                        }
                      />
                    </AvatarGroup>
                    <Text>
                      {celeb.firstName} & {pro.firstName}
                    </Text>
                  </Flex>
                </Td>
                <Td>{scores}</Td>
                <Td>{dances.map((dance) => dance.style).join(', ')}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
