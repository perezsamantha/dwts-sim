import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import CastImage from './castImage';
import { Team, useSimStore } from '../store/useStore';
import EditModal from './editModal';

export default function Team(props: { data: Team }) {
  const team = useSimStore((state) => state.cast[props.data.id - 1]);

  return (
    <Box
      maxWidth="250px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text>Team {props.data.id}</Text>
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
          <EditModal teamId={team.id} dancerId={0} />
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
          <EditModal teamId={team.id} dancerId={1} />
        </Box>
      </Flex>
    </Box>
  );
}
