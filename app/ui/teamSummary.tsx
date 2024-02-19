'use client';
import {
  Box,
  Collapse,
  Divider,
  Flex,
  IconButton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Team } from '../store/interfaces';
import CastImage from './castImage';
import { calculateAverage, getOrdinalNumber, totalScore } from '../lib/logic';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

export default function TeamSummary(props: { team: Team }) {
  const team = props.team;
  const [show, setShow] = useState(false);

  const { colorMode } = useColorMode();

  const lightModeShadow = '0 0 50px -25px rgba(0, 0, 0, 0.25)';
  const darkModeShadow =
    'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 0px 10px,rgba(0, 0, 0, 0.5) 0px 0 50px -15px';

  const OneTeam = () => {
    const celeb = team.teamMembers[0];
    const pro = team.teamMembers[1];
    return (
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        gap={2}
      >
        <Flex flexDirection="row" minWidth="275px" maxWidth="500px">
          <Box width="100%" mr={2}>
            <CastImage data={celeb} elim={false} />
          </Box>
          <Box width="100%">
            <CastImage data={pro} elim={false} />
          </Box>
        </Flex>
        <Text fontSize="lg">
          {celeb.firstname} {celeb.lastname || ''} & {pro.firstname}{' '}
          {pro.lastname || ''}
        </Text>
      </Box>
    );
  };

  return (
    <Box
      width="95%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      alignContent="center"
      rounded="lg"
      my={4}
      maxWidth="500px"
      py={5}
      px={4}
      boxShadow={colorMode === 'dark' ? darkModeShadow : lightModeShadow}
      bg={colorMode === 'dark' ? 'blackalpha.50' : 'whitealpha.900'}
      gap={1}
    >
      <OneTeam />
      <Text>{getOrdinalNumber(team.placement)} place</Text>
      <IconButton
        aria-label="toggle summary"
        onClick={() => setShow(!show)}
        icon={show ? <ChevronUpIcon /> : <ChevronDownIcon />}
        variant="ghost"
        size="sm"
        fontSize="2xl"
        mb={0}
      />
      <Collapse in={show} animateOpacity>
        {team.dances.map((dance, i) => (
          <Box
            key={i}
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            {(i === 0 || team.dances[i - 1].week !== dance.week) && (
              <Box mt={2}>
                <Text>Week {dance.week}</Text>
                <Divider borderColor="gray" />
              </Box>
            )}
            <Text>{dance.style}</Text>
            <Text>
              &#39;{dance.title}&#39; by {dance.artist}
            </Text>
            <Flex gap={2}>
              {dance.scores.map((score, i) => (
                <Text key={i}>{score}</Text>
              ))}
              <Text>-</Text>
              <Text>{totalScore(dance.scores)}</Text>
            </Flex>
          </Box>
        ))}
        <Text mt={4} align="center" fontWeight="600">
          Average - {calculateAverage(team.dances)}
        </Text>
      </Collapse>
    </Box>
  );
}
