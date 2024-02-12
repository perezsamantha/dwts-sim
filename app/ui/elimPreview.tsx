import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Team } from '../store/interfaces';
import CastImage from './castImage';
import { useState } from 'react';

export default function ElimPreview(props: { team: Team }) {
  const { team } = props;
  const [reveal, setReveal] = useState(false);

  const getTeamName = () =>
    `${team.teamMembers[0].firstname} & ${team.teamMembers[1].firstname}`;

  const handleReveal = () => {
    setReveal(true);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minWidth="300px"
      justifyContent="center"
      my={1}
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
          //filter: !reveal ? 'blur(64px)' : 'blur(0px)',
          opacity: !reveal ? '0%' : '100%',
        }}
        display="flex"
        flexDirection="column"
        gap={1}
      >
        <Flex flexDirection="row" my={1}>
          <Box width="100%" mr={2}>
            <CastImage data={team.teamMembers[0]} elim={true} />
          </Box>{' '}
          <Box width="100%">
            <CastImage data={team.teamMembers[1]} elim={true} />
          </Box>
        </Flex>
        <Text align="center">{getTeamName()}</Text>
      </Box>
    </Box>
  );
}
