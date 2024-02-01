// app/theme.ts

import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const theme = extendTheme({
  ...config,
  // styles: {
  //   global: {
  //     'html, body': {
  //       color: 'blue.600',
  //       lineHeight: 'tall',
  //     },
  //     a: {
  //       color: 'teal.500',
  //     },
  //   },
  // },
  components: {
    Button: {
      baseStyle: {
        //textTransform: 'uppercase',
        borderRadius: '3xl',
        _hover: { transform: 'scale(1.05,1.05)' },
      },
      variants: {
        custom: {
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
  },
});

export default theme;
