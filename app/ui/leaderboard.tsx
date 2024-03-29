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
  Flex,
  AspectRatio,
} from '@chakra-ui/react';
import { totalScore } from '@/app/lib/logic';
import { Dance, Team } from '../store/interfaces';
import AvatarImage from './avatarImage';

export default function Leaderboard(props: {
  cast: Team[];
  dances: { [teamId: string]: Dance[] };
  ids: string[];
}) {
  const double = props.dances[props.ids[0]].length === 2;

  return (
    <TableContainer my={2}>
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
                  <Flex width="100%" direction="row" alignItems="center">
                    <Box
                      width="100%"
                      minWidth="125px"
                      maxWidth="125px"
                      position="relative"
                      display="flex"
                      flexDirection="row"
                    >
                      <AspectRatio ratio={1} width="100%" zIndex="-1">
                        <AvatarImage dancer={celeb} />
                      </AspectRatio>
                      <AspectRatio ratio={1} width="100%" zIndex="-2" right={3}>
                        <AvatarImage dancer={pro} />
                      </AspectRatio>
                    </Box>
                    <Text>
                      {celeb.firstname} & {pro.firstname}
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
