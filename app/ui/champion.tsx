import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Team } from '../store/interfaces';
import CastImage from './castImage';
import { useState } from 'react';

export default function Champion(props: { team: Team }) {
  const { team } = props;
  const [reveal, setReveal] = useState(false);

  const handleReveal = () => {
    setReveal(true);
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {!reveal && (
        <Button
          variant="ghost"
          position="absolute"
          onClick={handleReveal}
          zIndex={10}
        >
          Reveal
        </Button>
      )}
      <Box
        width="100%"
        sx={{
          filter: !reveal ? 'blur(64px)' : 'blur(0px)',
          opacity: !reveal ? '75%' : '100%',
        }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Flex flexDirection="row" my={1} width="100%">
          <Box width="100%" mr={2}>
            <CastImage data={team.teamMembers[0]} elim={false} />
          </Box>{' '}
          <Box width="100%">
            <CastImage data={team.teamMembers[1]} elim={false} />
          </Box>
        </Flex>
        <Text fontSize="2xl">
          {team.teamMembers[0].firstName} {team.teamMembers[0].lastName} &{' '}
          {team.teamMembers[1].firstName} {team.teamMembers[1].lastName}
        </Text>
        <Text fontSize="2xl">🏆🪩✨</Text>
      </Box>
    </Box>
  );
}
