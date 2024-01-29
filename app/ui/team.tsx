import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import CastImage from './castImage';
import { Team, useBoundStore } from '../store/useStore';
import EditModal from './editModal';

export default function Team(props: { teamId: number }) {
  const team = useBoundStore((state) => state.cast[props.teamId]);

  return (
    <Box
      maxWidth="250px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text>Team {props.teamId + 1}</Text>
      <Flex width="100%">
        <Box width="48%">
          <CastImage data={team.teamMembers[0]} />
          <Text align="center" noOfLines={1}>
            {team.teamMembers[0].firstName}
          </Text>
          {team.teamMembers[0].lastName ? (
            <Text align="center" noOfLines={1}>
              {team.teamMembers[0].lastName}
            </Text>
          ) : (
            <br />
          )}
          <EditModal teamId={props.teamId} dancerId={0} />
        </Box>
        <Spacer />
        <Box width="48%" alignItems="center">
          <CastImage data={team.teamMembers[1]} />
          <Text align="center" noOfLines={1}>
            {team.teamMembers[1].firstName}
          </Text>
          {team.teamMembers[1].lastName ? (
            <Text align="center" noOfLines={1}>
              {team.teamMembers[1].lastName}
            </Text>
          ) : (
            <br />
          )}
          <EditModal teamId={props.teamId} dancerId={1} />
        </Box>
      </Flex>
    </Box>
  );
}
