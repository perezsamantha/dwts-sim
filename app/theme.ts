// app/theme.ts

import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import '@fontsource-variable/raleway';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const theme = extendTheme({
  ...config,
  styles: {
    global: {
      body: {
        fontFamily: 'Raleway Variable, sans-serif!',
        fontWeight: '600',
        my: 1,
      },
    },
  },
  fonts: {
    heading: 'Raleway Variable, sans-serif',
    body: 'Raleway Variable, sans-serif',
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: 'Raleway Variable, sans-serif',
        fontWeight: '600',
        mb: 2,
      },
    },
    Text: {
      baseStyle: {
        fontFamily: 'Raleway Variable, sans-serif',
        fontWeight: '500',
        my: 1,
      },
    },
    Button: {
      baseStyle: {
        fontFamily: 'Raleway Variable, sans-serif',
        fontWeight: '700',
        //textTransform: 'uppercase',
        borderRadius: '3xl',
        _hover: { transform: 'scale(1.05,1.05)' },
        my: 2,
      },
      variants: {
        custom: {
          margin: 4,
          color: 'white',
          bg: 'gray.700',
          borderRadius: '3xl',
          transition: 'transform 0.15s ease-out, background 0.15s ease-out',
          _hover: {
            transform: 'scale(1.05, 1.05)',
            bg: `gray.800`,

            _dark: {
              bg: `gray.600`,
            },
          },
          _active: {
            bg: `gray.700`,
            transform: 'scale(1, 1)',

            _dark: {
              bg: `gray.300`,
            },
          },
        },
        icons: {},
      },
      defaultProps: {
        variant: 'solid',
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'gray.500',
      },
    },
  },
});

export default theme;
