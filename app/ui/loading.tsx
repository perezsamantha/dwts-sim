import { Box, Spinner } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={4}
      height="100vh"
      justifyContent="center"
    >
      <Spinner size="lg" />
    </Box>
  );
}
