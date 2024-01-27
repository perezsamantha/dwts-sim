'use client';
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import Team from '../ui/team';
import { useBoundStore } from '../store/useStore';
import WeekButton from '../ui/weekButton';
import EditJudgesModal from '../ui/editJudgesModal';
import Header from '../ui/header';

export default function Home() {
  const { cast, numberWeeks, judges, updateNumberWeeks, numberTeams } =
    useBoundStore();
  const updateNumberTeams = useBoundStore((state) => state.updateNumberTeams);

  const labelStyles = {
    mt: '2',
    ml: '-2',
    fontSize: 'sm',
  };

  return (
    <div className="flex flex-col items-center justify-between p-12">
      <Header />
      <h2>Customize Simulator</h2>
      <Flex width="100%">
        <Text>Weeks</Text>
        <Box pt={6} pb={2} width={'50%'}>
          <Slider
            aria-label="slider-weeks"
            //onChange={(val) => setWeeksValue(val)}
            onChange={(val) => updateNumberWeeks(val)}
            defaultValue={numberWeeks}
            min={8}
            max={12}
          >
            {Array.from({ length: 5 }, (_, i) => i + 8).map((week) => (
              <SliderMark key={week} value={week} {...labelStyles}>
                {week}
              </SliderMark>
            ))}

            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>

        <Text>Teams</Text>
        <Box pt={6} pb={2} width={'50%'}>
          <Slider
            aria-label="slider-teams"
            onChange={(val) => updateNumberTeams(val)}
            defaultValue={numberTeams}
            min={10}
            max={16}
          >
            {Array.from({ length: 7 }, (_, i) => i + 10).map((team) => (
              <SliderMark key={team} value={team} {...labelStyles}>
                {team}
              </SliderMark>
            ))}
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </Flex>
      <Heading>Cast</Heading>
      <Container maxWidth="100%">
        <SimpleGrid minChildWidth="200px" spacing="20px">
          {cast.map((team) => (
            <Team key={team.id} data={team} />
          ))}
        </SimpleGrid>
      </Container>
      <Heading>Judges</Heading>
      {judges.map((judge, i) => (
        <Box key={i}>
          <p>{judge}</p>
        </Box>
      ))}
      <EditJudgesModal />
      <WeekButton week={1} />
    </div>
  );
}
