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
import { Team } from '../store/useStore';

export default function Leaderboard(props: { cast: Team[] }) {
  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Team</Th>
            <Th>Score</Th>
            <Th>Style</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.cast.map((obj, i) => {
            const celeb = obj.teamMembers[0];
            const pro = obj.teamMembers[1];
            const dance = obj.dances[obj.dances.length - 1];
            const scores = dance.scores;
            return (
              <Tr key={i}>
                <Td>
                  <Flex direction="row" alignItems="center">
                    <AvatarGroup>
                      <Avatar name={`${celeb.firstName}`} src={celeb.image} />
                      <Avatar name={`${pro.firstName}`} src={pro.image} />
                    </AvatarGroup>
                    <Text>
                      {celeb.firstName} & {pro.firstName}
                    </Text>
                  </Flex>
                </Td>
                <Td>{totalScore(scores)}</Td>
                <Td>{dance.style}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
