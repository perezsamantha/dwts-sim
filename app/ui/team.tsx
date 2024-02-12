import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import CastImage from './castImage';
import { useBoundStore } from '../store/useStore';
import { Team } from '../store/interfaces';
import EditModal from './editModal';

export default function Team(props: { teamId: number }) {
  const team = useBoundStore((state) => state.cast[props.teamId]);

  return (
    <Box
      maxWidth="250px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
    >
      <Text mb={2} fontSize="lg" fontWeight="500">
        Team {props.teamId + 1}
      </Text>
      <Flex width="100%">
        <Box width="48%">
          <CastImage data={team.teamMembers[0]} elim={false} />
          <Text align="center" noOfLines={1} mb={0} mt={2}>
            {team.teamMembers[0].firstname}
          </Text>
          {team.teamMembers[0].lastname ? (
            <Text align="center" noOfLines={1} mt={0}>
              {team.teamMembers[0].lastname}
            </Text>
          ) : (
            <br />
          )}
          <EditModal teamId={props.teamId} dancerId={0} />
        </Box>
        <Spacer />
        <Box width="48%" alignItems="center">
          <CastImage data={team.teamMembers[1]} elim={false} />
          <Text align="center" noOfLines={1} mb={0} mt={2}>
            {team.teamMembers[1].firstname}
          </Text>
          {team.teamMembers[1].lastname ? (
            <Text align="center" noOfLines={1} mt={0}>
              {team.teamMembers[1].lastname}
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
