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
      baseStyle: { textTransform: 'uppercase' },
      defaultProps: {
        variant: 'solid',
      },
    },
  },
});

export default theme;
