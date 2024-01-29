'use client';
import { Box, Text } from '@chakra-ui/react';
import HomeButton from './ui/homeButton';

export default function Custom404() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={8}>
      <Text>Page Not Found</Text>
      <HomeButton />
    </Box>
  );
}
