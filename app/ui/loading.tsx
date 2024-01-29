import { Box, Spinner } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={8}>
      <Spinner size="lg" />
    </Box>
  );
}
