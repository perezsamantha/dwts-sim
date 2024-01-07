'use client';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Select,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import CastImage from '../ui/castImage';
import Team from '../ui/team';

export default function Home() {
  const [weeksValue, setWeeksValue] = useState(10);
  const [teamsValue, setTeamsValue] = useState(12);

  const labelStyles = {
    mt: '2',
    ml: '-2',
    fontSize: 'sm',
  };

  return (
    <div className="flex flex-col items-center justify-between p-24">
      <h2>Customize Simulator</h2>
      <Text>Weeks</Text>
      <Box pt={6} pb={2} width={'50%'}>
        <Slider
          aria-label="slider-weeks"
          onChange={(val) => setWeeksValue(val)}
          defaultValue={10}
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
          onChange={(val) => setTeamsValue(val)}
          defaultValue={12}
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
      <Heading>Cast</Heading>
      <Container maxWidth="100%">
        <SimpleGrid minChildWidth="160px" spacing="20px">
          {Array.from({ length: teamsValue }, (_, i) => i + 1).map((team) => (
            <Team key={team} id={team} />
          ))}
        </SimpleGrid>
      </Container>
      <Button>Start Simulation</Button>
    </div>
  );
}
