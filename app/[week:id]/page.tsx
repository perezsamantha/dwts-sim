import { Box, Button } from '@chakra-ui/react';

export default function PressRelease() {
  //TODO: redirect when needed

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <h1>Week 1</h1>
      <p>
        Live from Hollywood, it&#39;s the season premiere of Dancing with the
        Stars!
      </p>
      <p>
        First up, dancing a cha cha to Cuff It by Beyonce, it&#39;s Ariana and
        Daniella
      </p>
      <p>Score: Carrie Ann Inaba - 7, Derek Hough - 10, Bruno Tonioli - 9</p>
      <Button>Elimination</Button>
    </Box>
  );
}
