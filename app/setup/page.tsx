'use client';
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import Team from '../ui/team';
import { useBoundStore } from '../store/useStore';
import WeekButton from '../ui/weekButton';
import EditJudgesModal from '../ui/editJudgesModal';
import Header from '../ui/header';
import CastStorage from '../ui/castStorage';
import EditNumberWeeks from '../ui/editNumberWeeks';
import EditNumberTeams from '../ui/editNumberTeams';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { cast, judges, randomizeCast, resetSim, currentWeek } =
    useBoundStore();
  const router = useRouter();

  const handleRandomize = () => {
    randomizeCast();
    resetSim();
  };

  const handleReset = () => {
    resetSim();
  };

  const handleContinue = () => {
    router.push(`/week${currentWeek}`);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={4}>
      <Header type="setup" week={0} />
      <Heading as="h1" size="xl" textAlign="center">
        Customize Simulator
      </Heading>

      <Text fontSize="lg" fontWeight="500">
        Weeks
      </Text>
      <EditNumberWeeks />

      <Text fontSize="lg" fontWeight="500">
        Teams
      </Text>
      <EditNumberTeams />

      <Text fontSize="lg" fontWeight="500">
        Judges
      </Text>
      <Flex width="100%" maxW="500px" flexDirection="row" alignItems="center">
        {judges.map((judge, i) => (
          <Box key={i} width={1 / 3}>
            <Text align="center" mb={0}>
              {judge}
            </Text>
          </Box>
        ))}
      </Flex>
      <EditJudgesModal />

      <Heading as="h4" size="lg" my={2}>
        Cast
      </Heading>
      <Box width="100%">
        <SimpleGrid columns={[2, 3, 3, 4, 5, 6]} spacing="20px">
          {cast.map((_, i) => (
            <Team key={i} teamId={i} />
          ))}
        </SimpleGrid>
      </Box>
      <Button onClick={handleRandomize}>Randomize</Button>

      <CastStorage />

      {currentWeek > 0 ? (
        <Box
          width="300px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={4}
        >
          <Text fontSize="xl" fontWeight="600">
            Sim in progress!
          </Text>
          <Flex flexDirection="row" alignItems="center">
            <Button colorScheme="red" onClick={handleReset}>
              Reset
            </Button>
            <Text mx={2}>or</Text>
            <Button onClick={handleContinue}>Continue</Button>
          </Flex>
        </Box>
      ) : (
        <Box
          width="300px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={4}
        >
          <Text fontSize="xl" fontWeight="600">
            Start simulation!
          </Text>

          <WeekButton week={1} />
        </Box>
      )}
    </Box>
  );
}
