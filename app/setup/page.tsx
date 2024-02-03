'use client';
import { Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import Team from '../ui/team';
import { useBoundStore } from '../store/useStore';
import WeekButton from '../ui/weekButton';
import EditJudgesModal from '../ui/editJudgesModal';
import Header from '../ui/header';
import CastStorage from '../ui/castStorage';
import EditNumberWeeks from '../ui/editNumberWeeks';
import EditNumberTeams from '../ui/editNumberTeams';

export default function Home() {
  const { cast, judges, randomizeCast, resetSim } = useBoundStore();

  const handleRandomize = () => {
    randomizeCast();
    resetSim();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={8}>
      <Header type="setup" week={0} />
      <h2>Customize Simulator</h2>
      <Text>Weeks</Text>
      <EditNumberWeeks />
      <Text>Teams</Text>
      <EditNumberTeams />
      <Heading>Cast</Heading>
      <Box width="100%">
        <SimpleGrid minChildWidth="200px" spacing="20px">
          {cast.map((team, i) => (
            <Team key={i} teamId={i} />
          ))}
        </SimpleGrid>
      </Box>
      <Button onClick={handleRandomize}>Randomize Cast</Button>

      <CastStorage />

      <Heading>Judges</Heading>
      {judges.map((judge, i) => (
        <Box key={i}>
          <p>{judge}</p>
        </Box>
      ))}
      <EditJudgesModal />
      <Text>Check if sim in progress, give option to reset</Text>
      <WeekButton week={1} />
    </Box>
  );
}
