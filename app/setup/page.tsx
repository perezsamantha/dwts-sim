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
      <Heading as="h1" size="xl" textAlign="center">
        Customize Simulator
      </Heading>
      <Text>Weeks</Text>
      <EditNumberWeeks />
      <Text>Teams</Text>
      <EditNumberTeams />
      <Heading as="h4" size="lg">
        Cast
      </Heading>
      <Box width="100%">
        <SimpleGrid columns={[2, 3, 3, 4, 5, 6]} spacing="20px">
          {cast.map((team, i) => (
            <Team key={i} teamId={i} />
          ))}
        </SimpleGrid>
      </Box>
      <Button onClick={handleRandomize}>Randomize Cast</Button>

      <CastStorage />

      <Heading as="h5" size="lg">
        Judges
      </Heading>
      {judges.map((judge, i) => (
        <Box key={i}>
          <Text>{judge}</Text>
        </Box>
      ))}
      <EditJudgesModal />
      <Text>Check if sim in progress, give option to reset</Text>
      <WeekButton week={1} />
    </Box>
  );
}
