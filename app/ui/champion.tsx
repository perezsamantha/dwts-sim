import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { Team } from '../store/interfaces';
import CastImage from './castImage';
import { useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '../lib/functions';

export default function Champion(props: { team: Team }) {
  const { team } = props;
  const [reveal, setReveal] = useState(false);
  const { width, height } = useWindowSize();

  const colors = [
    '#c0c0c0',
    '#848482',
    '#eae0c8',
    '#ffd700',
    '#d4af37',
    'rgb(208,155,47)',
    '#9c7c38',
  ];

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
      mt={2}
      overflowX={'hidden'}
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
          opacity: !reveal ? '0%' : '100%',
        }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Flex flexDirection="row" my={1} width="100%">
          <Box width="48%" mr={2}>
            <CastImage data={team.teamMembers[0]} elim={false} />
          </Box>{' '}
          <Spacer />
          <Box width="48%">
            <CastImage data={team.teamMembers[1]} elim={false} />
          </Box>
        </Flex>
        <Text fontSize="2xl">
          {team.teamMembers[0].firstname} {team.teamMembers[0]?.lastname || ''}{' '}
          & {team.teamMembers[1].firstname}{' '}
          {team.teamMembers[1]?.lastname || ''}
        </Text>
        <Text fontSize="2xl">🏆🪩✨</Text>
      </Box>
      {reveal && (
        <Confetti
          width={width < 992 ? width : width - 10}
          height={width < 992 ? height : height - 10}
          recycle={false}
          numberOfPieces={350}
          gravity={0.1}
          colors={colors}
          initialVelocityX={6}
          initialVelocityY={20}
          confettiSource={{ w: 0, h: 0, x: width / 2, y: height }}
          drawShape={(ctx) => {
            const numPoints = Math.floor(Math.random() * 2) + 4;
            const outerRadius = 10;
            const innerRadius = outerRadius / 2;
            ctx.beginPath();
            ctx.moveTo(0, 0 - outerRadius);

            for (let n = 1; n < numPoints * 2; n++) {
              const radius = n % 2 === 0 ? outerRadius : innerRadius;
              const x = radius * Math.sin((n * Math.PI) / numPoints);
              const y = -1 * radius * Math.cos((n * Math.PI) / numPoints);
              ctx.lineTo(x, y);
            }
            ctx.fill();
            ctx.closePath();
          }}
        />
      )}
    </Box>
  );
}
