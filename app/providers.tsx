// app/providers.tsx
'use client';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import '@fontsource-variable/raleway';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {children}
    </ChakraProvider>
  );
}
